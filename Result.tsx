import { useEffect, useMemo } from 'react';
import { useSession, finishSession, startSession, clearSession, answerOf, isPassing, summarize } from '../lib/session';
import { BADGES } from '../lib/store';
import { chapterById } from '../data/curriculum';
import { Stars, Notice } from '../components/ui';
import { Icon } from '../components/Icon';
import { go, href } from '../lib/router';

export function Result() {
  const s = useSession();
  useEffect(() => { if (s && !s.result) finishSession(); }, [s?.id]);

  if (!s || !s.result) return (
    <div className="card card-pad center stack"><h2>Belum ada hasil</h2><a className="btn btn-primary" href={href('latihan')}>Mulai latihan</a></div>
  );
  const { attempt, newBadges } = s.result;
  const sum = useMemo(() => summarize(s), [s]);
  const weak = Object.entries(attempt.perChapter).filter(([, v]) => v.points / v.total < 60).map(([id]) => chapterById(id)!).filter(Boolean);
  const message = attempt.score >= 90 ? 'Luar biasa! Kamu sangat paham materi ini.' : attempt.score >= 70 ? 'Bagus sekali! Kamu sudah paham sebagian besar.' : attempt.score >= 50 ? 'Kamu sudah berusaha dengan baik. Sedikit lagi!' : 'Tidak apa-apa. Belajar itu butuh proses. Yuk baca lagi materinya, lalu coba lagi.';

  function again() {
    const { id, plan, planIndex, questions, answers, index, loading, error, finished, result, ...cfg } = s!;
    const r = startSession(cfg);
    if (!('error' in r)) go('sesi');
  }

  return (
    <div className="stack">
      <section className="card result-hero">
        <Stars count={attempt.stars} size={44} />
        <h1>Nilaimu {attempt.score}</h1>
        <p>{message}</p>
        <div className="grid g3 result-stats">
          <div><b>{attempt.correct}/{attempt.total}</b><span>soal tepat</span></div>
          <div><b>+{attempt.xp}</b><span>XP</span></div>
          <div><b>+{attempt.stars}</b><span>bintang</span></div>
        </div>
        {s.mode === 'demo' && <p className="muted small">Hasil dari Mode Demo (soal contoh, penilaian esai oleh dirimu sendiri).</p>}
      </section>

      {newBadges.length > 0 && (
        <Notice tone="ok" title="Lencana baru!">{newBadges.map(id => BADGES.find(b => b.id === id)?.title).join(', ')}</Notice>
      )}

      <section className="card card-pad">
        <h2>Rekomendasi</h2>
        {weak.length ? (
          <ul className="reco">{weak.map(c => (
            <li key={c.id}><span>Pelajari lagi <strong>{c.title}</strong></span>
              <span className="row"><a className="btn btn-soft btn-sm" href={href(`materi/${c.subtopics[0].id}`)}>Baca materi</a>
                <a className="btn btn-ghost btn-sm" href={href('latihan', { subject: c.subject, chapter: c.id })}>Latihan lagi</a></span></li>
          ))}</ul>
        ) : <p className="muted">Pertahankan! Coba tingkat kesulitan lebih tinggi atau bab lain.</p>}
      </section>

      <section className="card card-pad">
        <h2>Pembahasan semua soal</h2>
        <div className="review">
          {sum.done.map((q, i) => {
            const rec = answerOf(s, q.id);
            const ok = isPassing(rec.score);
            const yours = q.type === 'pilihan-ganda' ? `${String.fromCharCode(65 + Number(rec.response))}. ${q.options![Number(rec.response)]}` : rec.response;
            return (
              <details key={q.id} className={ok ? 'ok' : 'no'}>
                <summary><Icon name={ok ? 'check' : 'x'} size={18} /> <span>{i + 1}. {q.prompt.length > 90 ? q.prompt.slice(0, 90) + '…' : q.prompt}</span><b>{rec.score}</b></summary>
                <p>{q.prompt}</p>
                <p><span className="muted">Jawabanmu:</span> {yours}</p>
                {q.type === 'pilihan-ganda' && <p><span className="muted">Jawaban benar:</span> <strong>{String.fromCharCode(65 + q.answerIndex!)}. {q.options![q.answerIndex!]}</strong></p>}
                {q.type === 'cerita' && <p><span className="muted">Jawaban benar:</span> <strong>{q.answer}</strong></p>}
                {q.type === 'esai' && <p><span className="muted">Contoh jawaban:</span> {rec.grade?.betterAnswer || q.modelAnswer}</p>}
                <ol className="steps">{q.explanation.map((e, k) => <li key={k}>{e}</li>)}</ol>
              </details>
            );
          })}
        </div>
      </section>

      <div className="row wrap">
        <button className="btn btn-primary btn-lg" onClick={again}><Icon name="refresh" size={18} /> {s.mode === 'ai' ? 'Latihan lagi dengan soal baru' : 'Ulangi latihan'}</button>
        <a className="btn btn-soft btn-lg" href={href('latihan')} onClick={() => clearSession()}>Pilih latihan lain</a>
        <a className="btn btn-ghost btn-lg" href={href('')} onClick={() => clearSession()}>Beranda</a>
      </div>
    </div>
  );
}
