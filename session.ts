import { useSyncExternalStore } from 'react';
import type { Difficulty, EssayGradeResult, Grade, QType, Question, SubjectId } from '../types';
import { CHAPTERS, chapterById } from '../data/curriculum';
import { DEMO_QUESTIONS } from '../data/demo-questions';
import { apiGenerate, apiGrade, ApiError } from './api';
import { checkShortAnswer, parseNumber } from './calc';
import { awardBadges, update, getState, type Attempt } from './store';

export type SQ = Question & { chapterId: string };
export interface AnswerRec {
  response: string;
  checked: boolean;
  score: number | null;
  grading: boolean;
  grade?: EssayGradeResult;
  /** esai mode demo: poin rubrik yang dicentang anak */
  selfChecked?: number[];
  awaitingSelf?: boolean;
  note?: string;
}
export interface PlanItem { chapterId: string; type: QType; count: number; }
export interface SessionConfig {
  mode: 'ai' | 'demo';
  scope: Attempt['scope'];
  grade: Grade;
  subject: SubjectId;
  chapterIds: string[];
  subtopicId?: string;
  type: QType | 'campur';
  difficulty: Difficulty;
  total: number | null; // null = tanpa batas
}
export interface Session extends SessionConfig {
  id: string;
  plan: PlanItem[];
  planIndex: number;
  questions: SQ[];
  answers: Record<string, AnswerRec>;
  index: number;
  loading: boolean;
  error?: string;
  finished: boolean;
  result?: SessionResult;
}
export interface SessionResult {
  attempt: Attempt;
  newBadges: string[];
  answered: number;
}

const SKEY = 'teman-pintar:session';
let session: Session | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());

function persist() {
  try { session ? sessionStorage.setItem(SKEY, JSON.stringify(session)) : sessionStorage.removeItem(SKEY); } catch { /* abaikan */ }
}
function setSession(fn: (s: Session) => Session) {
  if (!session) return;
  session = fn(session);
  persist();
  emit();
}
export const getSession = () => session;
export function useSession(): Session | null {
  return useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => session);
}

const PATTERN: QType[] = ['pilihan-ganda', 'cerita', 'pilihan-ganda', 'esai', 'cerita'];
export const BATCH = 10;
export const UNLIMITED_BATCH = 5;

export function buildPlan(chapterIds: string[], type: QType | 'campur', total: number): PlanItem[] {
  const share = Math.ceil(total / chapterIds.length);
  const items: PlanItem[] = [];
  let remaining = total;
  chapterIds.forEach((chapterId, ci) => {
    const n = Math.min(share, remaining);
    remaining -= n;
    if (n <= 0) return;
    const counts = new Map<QType, number>();
    for (let i = 0; i < n; i++) {
      const t = type === 'campur' ? PATTERN[(i + ci) % PATTERN.length] : type;
      counts.set(t, (counts.get(t) || 0) + 1);
    }
    for (const [t, c] of counts) {
      for (let left = c; left > 0; left -= BATCH) items.push({ chapterId, type: t, count: Math.min(BATCH, left) });
    }
  });
  return items;
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

export function demoPool(chapterIds: string[], type: QType | 'campur'): SQ[] {
  return chapterIds.flatMap(cid => (DEMO_QUESTIONS[cid] || []).filter(q => type === 'campur' || q.type === type).map(q => ({ ...q, chapterId: cid })));
}

export function startSession(cfg: SessionConfig): Session | { error: string } {
  const id = `s-${Date.now().toString(36)}`;
  if (cfg.mode === 'demo') {
    const pool = shuffle(demoPool(cfg.chapterIds, cfg.type));
    if (!pool.length) return { error: 'Mode demo belum punya soal untuk pilihan ini.' };
    const questions = cfg.total ? pool.slice(0, cfg.total) : pool;
    session = { ...cfg, id, plan: [], planIndex: 0, questions, answers: {}, index: 0, loading: false, finished: false };
    persist(); emit();
    return session;
  }
  const plan = buildPlan(cfg.chapterIds, cfg.type, cfg.total ?? UNLIMITED_BATCH);
  session = { ...cfg, id, plan, planIndex: 0, questions: [], answers: {}, index: 0, loading: false, finished: false };
  persist(); emit();
  void fetchMore();
  return session;
}

export function restoreSession() {
  try {
    const raw = sessionStorage.getItem(SKEY);
    if (!raw) return;
    session = JSON.parse(raw) as Session;
    if (session) { session.loading = false; if (session.planIndex < session.plan.length && !session.finished) void fetchMore(); }
  } catch { session = null; }
}

export function clearSession() { session = null; persist(); emit(); }

/** Muat batch soal berikutnya dari AI. Aman dipanggil berulang. */
export async function fetchMore(): Promise<void> {
  const s0 = session;
  if (!s0 || s0.loading || s0.mode !== 'ai') return;
  const unlimited = s0.total === null;
  if (unlimited && s0.planIndex >= s0.plan.length) {
    const more = buildPlan(s0.chapterIds, s0.type, UNLIMITED_BATCH);
    setSession(s => ({ ...s, plan: [...s.plan, ...more] }));
  }
  setSession(s => ({ ...s, loading: true, error: undefined }));
  try {
    while (session && session.id === s0.id && session.planIndex < session.plan.length) {
      const item = session.plan[session.planIndex];
      const sub = session.subtopicId && chapterById(item.chapterId)?.subtopics.some(x => x.id === session!.subtopicId) ? session.subtopicId : undefined;
      const avoid = session.questions.filter(q => q.chapterId === item.chapterId).map(q => q.prompt);
      const qs = await apiGenerate({ chapterId: item.chapterId, subtopicId: sub, type: item.type, difficulty: session.difficulty, count: item.count, avoid });
      if (!session || session.id !== s0.id) return;
      const sq: SQ[] = qs.map(q => ({ ...q, chapterId: item.chapterId }));
      setSession(s => ({ ...s, questions: [...s.questions, ...sq], planIndex: s.planIndex + 1 }));
      if (unlimited) break; // tanpa batas: satu batch dulu
    }
    setSession(s => ({ ...s, loading: false }));
  } catch (e) {
    const msg = e instanceof ApiError ? e.message : 'Ada kendala saat membuat soal. Coba lagi ya.';
    setSession(s => ({ ...s, loading: false, error: msg }));
  }
}

const emptyAnswer = (): AnswerRec => ({ response: '', checked: false, score: null, grading: false });
export const answerOf = (s: Session, qid: string): AnswerRec => s.answers[qid] || emptyAnswer();

export function setResponse(qid: string, response: string) {
  setSession(s => ({ ...s, answers: { ...s.answers, [qid]: { ...answerOf(s, qid), response } } }));
}
export function goTo(index: number) { setSession(s => ({ ...s, index })); }

function patchAnswer(qid: string, patch: Partial<AnswerRec>) {
  setSession(s => ({ ...s, answers: { ...s.answers, [qid]: { ...answerOf(s, qid), ...patch } } }));
}

export const isPassing = (score: number | null) => (score ?? 0) >= 70;

/** Periksa jawaban anak untuk satu soal. */
export async function checkAnswer(qid: string): Promise<void> {
  const s = session;
  if (!s) return;
  const q = s.questions.find(x => x.id === qid);
  if (!q) return;
  const rec = answerOf(s, qid);
  if (rec.checked || rec.grading) return;
  const resp = rec.response.trim();
  if (!resp) return;

  if (q.type === 'pilihan-ganda') {
    patchAnswer(qid, { checked: true, score: Number(resp) === q.answerIndex ? 100 : 0 });
    return;
  }

  if (q.type === 'cerita') {
    if (checkShortAnswer(resp, q.answer || '', q.acceptedAnswers)) { patchAnswer(qid, { checked: true, score: 100 }); return; }
    const numeric = parseNumber(q.answer || '') !== null && !/\p{L}{3,}/u.test((q.answer || '').replace(/(liter|meter|buah|orang|menit|detik|jam|kg|gram|cm|rp)/gi, ''));
    if (numeric) { patchAnswer(qid, { checked: true, score: 0 }); return; }
    // jawaban kata/kalimat: mungkin benar dengan kata lain
    if (s.mode === 'ai') {
      patchAnswer(qid, { grading: true });
      try {
        const g = await apiGrade({ chapterId: q.chapterId, prompt: q.prompt, rubric: q.rubric || [`Jawaban bermakna sama dengan kunci: ${q.answer}`], modelAnswer: `${q.answer}. ${q.explanation.join(' ')}`, studentAnswer: resp });
        patchAnswer(qid, { grading: false, checked: true, grade: g, score: g.score });
      } catch (e) {
        patchAnswer(qid, { grading: false, checked: true, score: 0, note: 'Jawabanmu belum cocok dengan kunci. Penilaian AI sedang tidak tersedia, jadi kami bandingkan dengan kunci saja.' });
      }
    } else {
      patchAnswer(qid, { checked: true, score: 0, awaitingSelf: true, note: 'Jawabanmu berbeda dari kunci. Jika artinya sama, kamu bisa menandainya benar sendiri.' });
    }
    return;
  }

  // esai
  if (s.mode === 'ai') {
    patchAnswer(qid, { grading: true });
    try {
      const g = await apiGrade({ chapterId: q.chapterId, prompt: q.prompt, rubric: q.rubric || [], modelAnswer: q.modelAnswer || '', studentAnswer: resp });
      patchAnswer(qid, { grading: false, checked: true, grade: g, score: g.score });
    } catch (e) {
      patchAnswer(qid, { grading: false, note: e instanceof ApiError ? e.message : 'Penilaian AI gagal. Coba lagi ya.' });
    }
  } else {
    patchAnswer(qid, { checked: true, awaitingSelf: true, selfChecked: [], score: null });
  }
}

export function toggleSelf(qid: string, i: number) {
  setSession(s => {
    const rec = answerOf(s, qid);
    const cur = new Set(rec.selfChecked || []);
    cur.has(i) ? cur.delete(i) : cur.add(i);
    return { ...s, answers: { ...s.answers, [qid]: { ...rec, selfChecked: [...cur] } } };
  });
}
export function finishSelfCheck(qid: string) {
  const s = session; if (!s) return;
  const q = s.questions.find(x => x.id === qid); if (!q) return;
  const rec = answerOf(s, qid);
  const total = q.rubric?.length || 1;
  patchAnswer(qid, { awaitingSelf: false, score: Math.round(((rec.selfChecked?.length || 0) / total) * 100) });
}
export function markSelfCorrect(qid: string) { patchAnswer(qid, { awaitingSelf: false, score: 100, note: 'Kamu menandai jawabanmu benar (penilaian sendiri).' }); }

export function summarize(s: Session) {
  const done = s.questions.filter(q => { const a = s.answers[q.id]; return a?.checked && a.score !== null && !a.awaitingSelf; });
  const points = done.reduce((t, q) => t + (s.answers[q.id].score || 0), 0);
  const score = done.length ? Math.round(points / done.length) : 0;
  const correct = done.filter(q => isPassing(s.answers[q.id].score)).length;
  const xp = done.reduce((t, q) => t + Math.round((s.answers[q.id].score || 0) / 10), 0);
  const stars = done.length ? (score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0) : 0;
  const perChapter: Attempt['perChapter'] = {};
  for (const q of done) {
    const c = perChapter[q.chapterId] || { points: 0, total: 0 };
    c.points += s.answers[q.id].score || 0; c.total += 1;
    perChapter[q.chapterId] = c;
  }
  return { done, score, correct, xp, stars, perChapter };
}

/** Akhiri sesi, simpan hasil ke penyimpanan lokal. */
export function finishSession(): SessionResult | null {
  const s = session;
  if (!s) return null;
  if (s.result) return s.result;
  const sum = summarize(s);
  if (!sum.done.length) { setSession(x => ({ ...x, finished: true })); return null; }
  const attempt: Attempt = {
    id: s.id, date: new Date().toISOString(), scope: s.scope, grade: s.grade, subject: s.subject, type: s.type, mode: s.mode,
    correct: sum.correct, total: sum.done.length, score: sum.score, xp: sum.xp, stars: sum.stars, perChapter: sum.perChapter,
  };
  update(st => ({
    ...st, xp: st.xp + attempt.xp, stars: st.stars + attempt.stars,
    attempts: [attempt, ...st.attempts].slice(0, 200), lastPracticeChapter: s.chapterIds[0],
  }));
  const newBadges = awardBadges();
  const result = { attempt, newBadges, answered: sum.done.length };
  setSession(x => ({ ...x, finished: true, result }));
  return result;
}

export const chapterIdsFor = (grade: Grade, subject: SubjectId) => CHAPTERS.filter(c => c.grade === grade && c.subject === subject).map(c => c.id);
export { getState };

/** Tambahkan satu soal serupa tepat setelah soal ini (hanya mode AI). */
export async function insertSimilar(qid: string): Promise<string | null> {
  const s = session;
  if (!s || s.mode !== 'ai') return null;
  const q = s.questions.find(x => x.id === qid);
  if (!q) return null;
  try {
    const [nq] = await apiGenerate({ chapterId: q.chapterId, type: q.type, difficulty: 'mudah', count: 1, avoid: s.questions.filter(x => x.chapterId === q.chapterId).map(x => x.prompt) });
    if (!nq || !session) return null;
    setSession(cur => {
      const i = cur.questions.findIndex(x => x.id === qid);
      const qs = [...cur.questions];
      qs.splice(i + 1, 0, { ...nq, chapterId: q.chapterId });
      return { ...cur, questions: qs };
    });
    return null;
  } catch (e) {
    return e instanceof ApiError ? e.message : 'Soal serupa belum bisa dibuat.';
  }
}
