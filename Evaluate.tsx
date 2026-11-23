import { useApp, chapterStats, MASTERED, REVIEW_BELOW } from '../lib/store';
import { SUBJECTS, chaptersFor } from '../data/curriculum';
import { GradeToggle, PageHeader, SubjectIcon, Notice, Progress } from '../components/ui';
import { Icon } from '../components/Icon';
import { go, href } from '../lib/router';
import { useAiStatus } from '../lib/ai';
import { startSession, chapterIdsFor } from '../lib/session';
import type { SubjectId } from '../types';

export function Evaluate() {
  const app = useApp();
  const ai = useAiStatus();
  const stats = chapterStats(app);
  const demo = ai ? !ai.configured : false;

  function quizChapter(chapterId: string, subject: SubjectId) {
    const r = startSession({ mode: demo ? 'demo' : 'ai', scope: 'kuis-bab', grade: app.grade, subject, chapterIds: [chapterId], type: 'campur', difficulty: 'sedang', total: 5 });
    if (!('error' in r)) go('sesi');
  }
  function quizSubject(subject: SubjectId) {
    const r = startSession({ mode: demo ? 'demo' : 'ai', scope: 'kuis-mapel', grade: app.grade, subject, chapterIds: chapterIdsFor(app.grade, subject), type: 'campur', difficulty: 'sedang', total: 10 });
    if (!('error' in r)) go('sesi');
  }
  const status = (id: string) => {
    const st = stats[id];
    if (!st) return { label: 'Belum dicoba', cls: '' };
    if (st.last < REVIEW_BELOW) return { label: 'Perlu diulang', cls: 'chip-warn' };
    if (st.best >= MASTERED) return { label: 'Sudah dikuasai', cls: 'chip-ok' };
    return { label: 'Sedang berkembang', cls: 'chip-ai' };
  };
  const review = SUBJECTS.flatMap(s => chaptersFor(app.grade, s.id)).filter(c => stats[c.id] && stats[c.id].last < REVIEW_BELOW);

  return (
    <div className="stack">
      <PageHeader title="Evaluasi" sub="Ukur seberapa paham kamu." right={<GradeToggle grade={app.grade} />} />
      {demo && <Notice tone="warn" title="Mode Demo">Kuis memakai soal contoh bawaan (bukan AI).</Notice>}

      <section>
        <h2>Kuis per mata pelajaran</h2>
        <div className="grid g4">
          {SUBJECTS.map(s => (
            <button key={s.id} className={`card subject tone-${s.color} btnlike`} onClick={() => quizSubject(s.id)}>
              <SubjectIcon id={s.id} /><strong>{s.label}</strong><span className="muted small">{demo ? 'Soal contoh' : '10 soal campur dari semua bab'}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>Kuis per bab</h2>
        <div className="stack tight">
          {SUBJECTS.map(s => chaptersFor(app.grade, s.id).map(c => {
            const st = status(c.id);
            return (
              <div key={c.id} className={`card row-card tone-${s.color}`}>
                <SubjectIcon id={s.id} size={22} />
                <div className="grow"><strong>{c.title}</strong><div className="muted small">{s.label} · Bab {c.number}{stats[c.id] ? ` · terakhir ${stats[c.id].last}` : ''}</div></div>
                <span className={`chip ${st.cls}`}>{st.label}</span>
                <button className="btn btn-soft btn-sm" onClick={() => quizChapter(c.id, s.id)}>Mulai kuis</button>
              </div>
            );
          }))}
        </div>
      </section>

      <section className="card card-pad">
        <h2>Materi yang perlu dipelajari kembali</h2>
        {review.length === 0 ? <p className="muted">Belum ada. Kerjakan kuis dulu, nanti rekomendasinya muncul di sini.</p> : (
          <ul className="reco">{review.map(c => (
            <li key={c.id}><span><strong>{c.title}</strong> <span className="muted small">nilai terakhir {stats[c.id].last}</span></span>
              <a className="btn btn-soft btn-sm" href={href(`materi/${c.subtopics[0].id}`)}>Pelajari lagi</a></li>
          ))}</ul>
        )}
      </section>

      <section className="card card-pad">
        <h2>Riwayat hasil</h2>
        {app.attempts.length === 0 ? <p className="muted">Belum ada riwayat.</p> : (
          <div className="history">
            {app.attempts.slice(0, 8).map(a => (
              <div key={a.id}><span>{new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · {SUBJECTS.find(s => s.id === a.subject)?.label} · {a.scope === 'latihan' ? 'Latihan' : a.scope === 'kuis-bab' ? 'Kuis bab' : 'Kuis mapel'}{a.mode === 'demo' ? ' (demo)' : ''}</span>
                <Progress value={a.score} tone={a.score >= MASTERED ? 'green' : a.score >= REVIEW_BELOW ? 'blue' : 'yellow'} /><b>{a.score}</b></div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
