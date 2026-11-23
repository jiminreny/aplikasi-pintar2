import { useEffect, useState } from 'react';
import { useApp } from '../lib/store';
import { SUBJECTS, chaptersFor, chapterById } from '../data/curriculum';
import type { Difficulty, QType, SubjectId } from '../types';
import { GradeToggle, PageHeader, SubjectIcon, Notice, Spinner } from '../components/ui';
import { Icon } from '../components/Icon';
import { go } from '../lib/router';
import { useAiStatus } from '../lib/ai';
import { startSession, demoPool, chapterIdsFor, type SessionConfig } from '../lib/session';

const TYPES: { id: QType | 'campur'; label: string; hint: string }[] = [
  { id: 'campur', label: 'Campur', hint: 'Semua jenis' },
  { id: 'pilihan-ganda', label: 'Pilihan ganda', hint: '4 pilihan' },
  { id: 'cerita', label: 'Soal cerita', hint: 'Situasi nyata' },
  { id: 'esai', label: 'Esai', hint: 'Tulis jawabanmu' },
];
const DIFFS: { id: Difficulty; label: string }[] = [{ id: 'mudah', label: 'Mudah' }, { id: 'sedang', label: 'Sedang' }, { id: 'sulit', label: 'Sulit' }];
const COUNTS: (number | null)[] = [5, 10, 20, 50, null];

export function Practice({ query }: { query: URLSearchParams }) {
  const app = useApp();
  const ai = useAiStatus();
  const qs = query.get('subject') as SubjectId | null;
  const qc = query.get('chapter');
  const qsub = query.get('sub');
  const qChap = qc ? chapterById(qc) : undefined;

  const [subject, setSubject] = useState<SubjectId>(qChap?.subject || qs || 'matematika');
  const [chapter, setChapter] = useState<string>(qChap?.id || 'semua');
  const [sub, setSub] = useState<string>(qsub || 'semua');
  const [type, setType] = useState<QType | 'campur'>('campur');
  const [difficulty, setDifficulty] = useState<Difficulty>('sedang');
  const [count, setCount] = useState<number | null>(5);
  const [error, setError] = useState('');

  const grade = qChap?.grade || app.grade;
  useEffect(() => { if (qChap && qChap.grade !== app.grade) import('../lib/store').then(m => m.update(s => ({ ...s, grade: qChap.grade }))); }, [qc]);

  const chapters = chaptersFor(grade, subject);
  useEffect(() => { if (chapter !== 'semua' && !chapters.some(c => c.id === chapter)) { setChapter('semua'); setSub('semua'); } }, [subject, grade]);
  const picked = chapter === 'semua' ? undefined : chapters.find(c => c.id === chapter);
  const chapterIds = picked ? [picked.id] : chapterIdsFor(grade, subject);

  if (ai === null) return <Spinner label="Menyiapkan..." />;
  const demo = !ai.configured;
  const available = demoPool(chapterIds, type).length;

  function start() {
    setError('');
    const cfg: SessionConfig = {
      mode: demo ? 'demo' : 'ai', scope: 'latihan', grade, subject, chapterIds,
      subtopicId: picked && sub !== 'semua' ? sub : undefined, type, difficulty, total: count,
    };
    const r = startSession(cfg);
    if ('error' in r) { setError(r.error); return; }
    go('sesi');
  }

  return (
    <div className="stack">
      <PageHeader title="Latihan" sub="Atur latihanmu, lalu mulai." right={<GradeToggle grade={grade} />} />

      {demo ? (
        <Notice tone="warn" title="Mode Demo (bukan AI)">Guru AI belum dihubungkan. Latihan memakai soal contoh tulisan tangan yang jumlahnya terbatas ({available} soal untuk pilihan ini). Tingkat kesulitan dan jumlah soal belum berlaku.</Notice>
      ) : (
        <Notice tone="ok" title="Soal dibuat oleh guru AI">Soal baru dibuat setiap kali kamu berlatih. Jawaban dan pembahasan baru muncul setelah kamu menjawab.</Notice>
      )}

      <section className="card card-pad form">
        <h3>1. Pilih mata pelajaran</h3>
        <div className="choice-row">
          {SUBJECTS.map(s => (
            <button key={s.id} className={`choice tone-${s.color} ${subject === s.id ? 'on' : ''}`} onClick={() => { setSubject(s.id); setChapter('semua'); setSub('semua'); }} aria-pressed={subject === s.id}>
              <SubjectIcon id={s.id} size={20} /> {s.label}
            </button>
          ))}
        </div>

        <h3>2. Pilih bab</h3>
        <div className="choice-row">
          <button className={`choice ${chapter === 'semua' ? 'on' : ''}`} onClick={() => { setChapter('semua'); setSub('semua'); }}>Semua bab</button>
          {chapters.map(c => <button key={c.id} className={`choice ${chapter === c.id ? 'on' : ''}`} onClick={() => { setChapter(c.id); setSub('semua'); }}>Bab {c.number}: {c.title}</button>)}
        </div>

        {picked && !demo && (
          <>
            <h3>Submateri <span className="muted small">(boleh dilewati)</span></h3>
            <div className="choice-row">
              <button className={`choice ${sub === 'semua' ? 'on' : ''}`} onClick={() => setSub('semua')}>Semua submateri</button>
              {picked.subtopics.map(s => <button key={s.id} className={`choice ${sub === s.id ? 'on' : ''}`} onClick={() => setSub(s.id)}>{s.title}</button>)}
            </div>
          </>
        )}

        <h3>3. Pilih jenis soal</h3>
        <div className="choice-row">
          {TYPES.map(t => <button key={t.id} className={`choice ${type === t.id ? 'on' : ''}`} onClick={() => setType(t.id)}><span>{t.label}</span><small>{t.hint}</small></button>)}
        </div>

        <div className={demo ? 'disabled' : ''}>
          <h3>4. Tingkat kesulitan</h3>
          <div className="choice-row">
            {DIFFS.map(d => <button key={d.id} disabled={demo} className={`choice ${difficulty === d.id ? 'on' : ''}`} onClick={() => setDifficulty(d.id)}>{d.label}</button>)}
          </div>
          <h3>5. Jumlah soal</h3>
          <div className="choice-row">
            {COUNTS.map(c => (
              <button key={String(c)} disabled={demo} className={`choice ${count === c ? 'on' : ''}`} onClick={() => setCount(c)}>
                {c === null ? <><Icon name="loop" size={18} /> Tanpa batas</> : c}
              </button>
            ))}
          </div>
          {count === null && !demo && <p className="muted small">Soal dibuat 5 demi 5. Kamu bisa berhenti kapan saja.</p>}
          {!demo && count !== null && count >= 20 && <p className="muted small">Soal dimuat bertahap. Kamu bisa mulai setelah batch pertama siap.</p>}
        </div>

        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-primary btn-lg" onClick={start} disabled={demo && available === 0}><Icon name="play" size={18} /> Mulai latihan</button>
      </section>
    </div>
  );
}
