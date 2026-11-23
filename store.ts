import { useSyncExternalStore } from 'react';
import type { Grade, SubjectId, QType } from '../types';
import { CHAPTERS, allSubtopics } from '../data/curriculum';

const KEY = 'teman-pintar:v1';

export interface Attempt {
  id: string;
  date: string;
  scope: 'latihan' | 'kuis-bab' | 'kuis-mapel';
  grade: Grade;
  subject: SubjectId;
  type: QType | 'campur';
  mode: 'ai' | 'demo';
  correct: number;
  total: number;
  score: number;
  xp: number;
  stars: number;
  perChapter: Record<string, { points: number; total: number }>;
}

export interface AppState {
  nickname: string;
  grade: Grade;
  xp: number;
  stars: number;
  learned: string[];
  lastSubtopic?: string;
  lastPracticeChapter?: string;
  attempts: Attempt[];
  badges: string[];
  onboarded: boolean;
}

const initial: AppState = { nickname: '', grade: 4, xp: 0, stars: 0, learned: [], attempts: [], badges: [], onboarded: false };

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch { /* abaikan */ }
  return { ...initial };
}

let state: AppState = load();
const listeners = new Set<() => void>();

export function update(fn: (s: AppState) => AppState) {
  state = fn(state);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* penyimpanan penuh/diblokir */ }
  listeners.forEach(l => l());
}
export const getState = () => state;
export function useApp(): AppState {
  return useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => state);
}
export function resetAll() {
  update(() => ({ ...initial }));
}

// ---------- Level, penguasaan, rekomendasi ----------
export const levelOf = (xp: number) => Math.floor(xp / 100) + 1;
export const LEVEL_NAMES = ['Pemula', 'Penjelajah', 'Pelajar Cerdas', 'Jagoan Belajar', 'Bintang Kelas', 'Juara Teman Pintar'];
export const levelName = (xp: number) => LEVEL_NAMES[Math.min(levelOf(xp) - 1, LEVEL_NAMES.length - 1)];
export const xpInLevel = (xp: number) => xp % 100;

export interface ChapterStat { attempts: number; best: number; last: number; }
export function chapterStats(s: AppState): Record<string, ChapterStat> {
  const out: Record<string, ChapterStat> = {};
  for (const a of s.attempts) {
    for (const [cid, v] of Object.entries(a.perChapter)) {
      if (!v.total) continue;
      const sc = Math.round(v.points / v.total);
      const cur = out[cid] || { attempts: 0, best: 0, last: 0 };
      out[cid] = { attempts: cur.attempts + 1, best: Math.max(cur.best, sc), last: sc };
    }
  }
  return out;
}
export const MASTERED = 80;
export const REVIEW_BELOW = 60;

export function recommendations(s: AppState, grade: Grade) {
  const stats = chapterStats(s);
  const chapters = CHAPTERS.filter(c => c.grade === grade);
  const review = chapters.filter(c => stats[c.id] && stats[c.id].last < REVIEW_BELOW);
  const fresh = chapters.filter(c => !stats[c.id]);
  const mastered = chapters.filter(c => stats[c.id] && stats[c.id].best >= MASTERED && stats[c.id].last >= REVIEW_BELOW);
  return { review, fresh, mastered, stats };
}

// ---------- Badge ----------
export interface BadgeDef { id: string; title: string; desc: string; check: (s: AppState) => boolean; }
const subjectBest = (s: AppState, subject: SubjectId) =>
  CHAPTERS.some(c => c.subject === subject && (chapterStats(s)[c.id]?.best ?? 0) >= MASTERED);

export const BADGES: BadgeDef[] = [
  { id: 'baca-1', title: 'Langkah Pertama', desc: 'Membaca satu materi sampai selesai.', check: s => s.learned.length >= 1 },
  { id: 'baca-5', title: 'Pembaca Rajin', desc: 'Menyelesaikan 5 materi.', check: s => s.learned.length >= 5 },
  { id: 'latih-1', title: 'Pelatih Pemula', desc: 'Menyelesaikan latihan pertama.', check: s => s.attempts.length >= 1 },
  { id: 'latih-10', title: 'Rajin Berlatih', desc: 'Menyelesaikan 10 latihan.', check: s => s.attempts.length >= 10 },
  { id: 'teliti', title: 'Teliti', desc: 'Mendapat nilai 100 pada satu latihan (minimal 3 soal).', check: s => s.attempts.some(a => a.score >= 100 && a.total >= 3) },
  { id: 'jago-mat', title: 'Jago Matematika', desc: 'Nilai 80 atau lebih pada satu bab Matematika.', check: s => subjectBest(s, 'matematika') },
  { id: 'jago-bi', title: 'Jago Bahasa Indonesia', desc: 'Nilai 80 atau lebih pada satu bab Bahasa Indonesia.', check: s => subjectBest(s, 'bahasa-indonesia') },
  { id: 'jago-be', title: 'Jago English', desc: 'Nilai 80 atau lebih pada satu bab Bahasa Inggris.', check: s => subjectBest(s, 'bahasa-inggris') },
  { id: 'jago-ipas', title: 'Jago IPAS', desc: 'Nilai 80 atau lebih pada satu bab IPAS.', check: s => subjectBest(s, 'ipas') },
  { id: 'esai', title: 'Penulis Kecil', desc: 'Menyelesaikan latihan yang memuat soal esai.', check: s => s.attempts.some(a => a.type === 'esai' || a.type === 'campur') },
  { id: 'bangkit', title: 'Pantang Menyerah', desc: 'Nilai naik setelah mengulang bab yang sama.', check: s => { const st = chapterStats(s); return Object.values(st).some(v => v.attempts >= 2 && v.last > 0 && v.best >= MASTERED && v.last >= MASTERED) && s.attempts.length >= 2; } },
];

export function awardBadges(): string[] {
  const earned: string[] = [];
  update(s => {
    const have = new Set(s.badges);
    for (const b of BADGES) if (!have.has(b.id) && b.check(s)) { have.add(b.id); earned.push(b.id); }
    return { ...s, badges: [...have] };
  });
  return earned;
}

export function markLearned(subtopicId: string) {
  update(s => {
    const first = !s.learned.includes(subtopicId);
    return { ...s, lastSubtopic: subtopicId, learned: first ? [...s.learned, subtopicId] : s.learned, xp: s.xp + (first ? 5 : 0) };
  });
  return awardBadges();
}

export function learnedCount(s: AppState, grade: Grade) {
  const ids = new Set(allSubtopics(grade).map(x => x.subtopic.id));
  return { done: s.learned.filter(id => ids.has(id)).length, total: ids.size };
}
