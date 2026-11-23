import { useEffect, useState } from 'react';
import { useSession, answerOf, setResponse, checkAnswer, goTo, fetchMore, finishSession, clearSession, toggleSelf, finishSelfCheck, markSelfCorrect, insertSimilar, isPassing, type SQ, type Session } from '../lib/session';
import { chapterById, findSubtopic } from '../data/curriculum';
import { Icon } from '../components/Icon';
import { Notice, Progress, Spinner } from '../components/ui';
import { go, href } from '../lib/router';

const TYPE_LABEL = { 'pilihan-ganda': 'Pilihan ganda', cerita: 'Soal cerita', esai: 'Esai' } as const;
const GOOD = ['Hebat! Jawabanmu benar.', 'Keren, kamu paham!', 'Tepat sekali!'];
const OK = ['Bagus, hampir sempurna!', 'Sudah cukup baik, tinggal sedikit lagi.'];
const TRY = ['Belum tepat, tetapi tidak apa-apa. Yuk kita pelajari bersama.', 'Coba perhatikan kembali soalnya. Yuk lihat pembahasannya.'];
const pick = (a: string[], seed: string) => a[[...seed].reduce((t, c) => t + c.charCodeAt(0), 0) % a.length];

function feedbackText(q: SQ, score: number) {
  if (score >= 90) return pick(GOOD, q.id);
  if (score >= 70) return pick(OK, q.id);
  return pick(TRY, q.id);
}

function Feedback({ q, s }: { q: SQ; s: Session }) {
  const rec = answerOf(s, q.id);
  const [similarMsg, setSimilarMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const score = rec.score ?? 0;
  const pass = isPassing(rec.score);
  const found = s.subtopicId ? findSubtopic(s.subtopicId) : undefined;
  const chapter = chapterById(q.chapterId)!;
  const subtopic = found && found.chapter.id === q.chapterId ? found.subtopic : chapter.subtopics[0];
  const [showEx, setShowEx] = useState(false);

  return (
    <div className={`feedback ${pass ? 'good' : 'try'}`} role="status">
      {rec.awaitingSelf ? (
        <p><strong>Waktunya mencocokkan jawabanmu.</strong></p>
      ) : (
        <p className="fb-title"><Icon name={pass ? 'check' : 'bulb'} size={22} /> <strong>{feedbackText(q, score)}</strong></p>
      )}

      {q.type === 'pilihan-ganda' && <p>Jawaban yang benar: <strong>{String.fromCharCode(65 + (q.answerIndex || 0))}. {q.options![q.answerIndex || 0]}</strong></p>}
      {q.type === 'cerita' && <p>Jawaban yang benar: <strong>{q.answer}</strong></p>}
      {rec.note && <p className="muted">{rec.note}</p>}

      {rec.grade && (
        <div className="rubric">
          <p><strong>Nilai: {rec.grade.score}/100</strong> <span className="muted small">(dinilai AI dengan rubrik; penilaian AI bisa saja kurang sempurna)</span></p>
          <ul className="rubric-list">{rec.grade.rubricScores.map(r => <li key={r.criterion}><span>{r.criterion}</span><b>{r.points}/{r.max}</b></li>)}</ul>
          {rec.grade.feedback && <p>{rec.grade.feedback}</p>}
          {rec.grade.correct.length > 0 && <><p className="mini">Yang sudah benar</p><ul>{rec.grade.correct.map((x, i) => <li key={i}>{x}</li>)}</ul></>}
          {rec.grade.improve.length > 0 && <><p className="mini">Yang bisa ditambahkan</p><ul>{rec.grade.improve.map((x, i) => <li key={i}>{x}</li>)}</ul></>}
          {rec.grade.betterAnswer && <><p className="mini">Contoh jawaban yang lebih baik</p><p className="quote">{rec.grade.betterAnswer}</p></>}
        </div>
      )}

      {q.type === 'esai' && s.mode === 'demo' && (
        <div className="rubric">
          <p className="mini">Contoh jawaban</p>
          <p className="quote">{q.modelAnswer}</p>
          {rec.awaitingSelf ? (
            <>
              <p>Centang poin yang sudah ada pada jawabanmu (penilaian sendiri, Mode Demo):</p>
              {(q.rubric || []).map((r, i) => (
                <label key={i} className="check-line"><input type="checkbox" checked={(rec.selfChecked || []).includes(i)} onChange={() => toggleSelf(q.id, i)} /> {r}</label>
              ))}
              <button className="btn btn-primary" onClick={() => finishSelfCheck(q.id)}>Selesai menilai</button>
            </>
          ) : <p className="muted">Nilai penilaian sendiri: {rec.score}/100</p>}
        </div>
      )}
      {q.type === 'cerita' && rec.awaitingSelf && s.mode === 'demo' && (
        <button className="btn btn-soft" onClick={() => markSelfCorrect(q.id)}>Jawabanku artinya sama, tandai benar</button>
      )}

      {!rec.awaitingSelf && (
        <>
          <h4>Pembahasan</h4>
          <ol className="steps">{q.explanation.map((e, i) => <li key={i}>{e}</li>)}</ol>
        </>
      )}

      {!pass && !rec.awaitingSelf && (
        <div className="row wrap">
          <button className="btn btn-soft btn-sm" onClick={() => setShowEx(!showEx)}><Icon name="bulb" size={16} /> {showEx ? 'Tutup contoh' : 'Lihat contoh serupa'}</button>
          <a className="btn btn-ghost btn-sm" href={href(`materi/${subtopic.id}`)} target="_blank" rel="noreferrer">Baca materi: {subtopic.title}</a>
          {s.mode === 'ai' && (
            <button className="btn btn-soft btn-sm" disabled={busy} onClick={async () => { setBusy(true); const m = await insertSimilar(q.id); setSimilarMsg(m || 'Soal serupa ditambahkan setelah soal ini.'); setBusy(false); }}>
              <Icon name="refresh" size={16} /> Coba soal serupa
            </button>
          )}
        </div>
      )}
      {showEx && (
        <div className="example-box">
          <p><strong>{subtopic.example.question}</strong></p>
          <ol className="steps">{subtopic.example.steps.map((e, i) => <li key={i}>{e}</li>)}</ol>
          <p>Jawaban: <strong>{subtopic.example.answer}</strong></p>
        </div>
      )}
      {similarMsg && <p className="muted small">{similarMsg}</p>}
    </div>
  );
}

export function SessionPage() {
  const s = useSession();

  // prefetch untuk mode tanpa batas
  useEffect(() => {
    if (s && s.mode === 'ai' && s.total === null && !s.loading && !s.error && s.questions.length > 0 && s.index >= s.questions.length - 2) void fetchMore();
  }, [s?.index, s?.questions.length]);

  if (!s) return (
    <div className="card card-pad center stack">
      <h2>Belum ada latihan yang berjalan</h2>
      <a className="btn btn-primary" href={href('latihan')}>Pilih latihan</a>
    </div>
  );

  if (s.questions.length === 0) {
    if (s.error) return (
      <div className="card card-pad center stack">
        <Notice tone="warn" title="Soal belum bisa dimuat">{s.error}</Notice>
        <div className="row"><button className="btn btn-primary" onClick={() => void fetchMore()}><Icon name="refresh" size={18} /> Coba lagi</button>
          <button className="btn btn-ghost" onClick={() => { clearSession(); go('latihan'); }}>Kembali</button></div>
      </div>
    );
    return <Spinner label="Guru AI sedang menyiapkan soalmu. Tunggu sebentar ya..." />;
  }

  const q = s.questions[Math.min(s.index, s.questions.length - 1)];
  const rec = answerOf(s, q.id);
  const chapter = chapterById(q.chapterId)!;
  const total = s.total ?? null;
  const known = s.questions.length;
  const moreComing = s.loading || (total !== null && s.planIndex < s.plan.length);
  const isLast = s.index + 1 >= known;
  const answeredCount = s.questions.filter(x => answerOf(s, x.id).checked).length;
  const shownTotal = total !== null && s.mode === 'ai' ? Math.max(total, known) : known;

  function end() {
    const r = finishSession();
    go(r ? 'hasil' : 'latihan');
    if (!r) clearSession();
  }
  function next() {
    if (!isLast) return goTo(s!.index + 1);
    if (moreComing || s!.total === null) { if (!s!.loading && s!.total === null) void fetchMore(); return; }
    end();
  }

  const canCheck = rec.response.trim().length > 0 && !rec.grading && !rec.checked;
  const waiting = isLast && rec.checked && !rec.awaitingSelf && (moreComing || (s.total === null && s.loading));
  const unlimitedStuck = isLast && s.total === null && !!s.error;

  return (
    <div className="stack session">
      <div className="between sess-head">
        <button className="btn btn-ghost btn-sm" onClick={() => go('latihan')}><Icon name="left" size={18} /> Keluar</button>
        <div className="grow">
          <div className="between small"><span>Soal {s.index + 1}{total !== null ? ` dari ${shownTotal}` : ''}</span><span className={`chip ${s.mode === 'ai' ? 'chip-ai' : 'chip-demo'}`}>{s.mode === 'ai' ? 'Soal AI' : 'Mode Demo'}</span></div>
          <Progress value={(answeredCount / Math.max(1, shownTotal)) * (total === null ? 0 : 1) * 100 || (total === null ? Math.min(100, answeredCount * 10) : 0)} tone="blue" />
        </div>
        <button className="btn btn-soft btn-sm" onClick={end} disabled={answeredCount === 0}>Akhiri</button>
      </div>

      <section className="card card-pad question">
        <div className="row wrap"><span className="chip">{TYPE_LABEL[q.type]}</span><span className="muted small">{chapter.title}</span></div>
        <p className="q-text">{q.prompt}</p>

        {q.type === 'pilihan-ganda' && (
          <div className="options" role="radiogroup" aria-label="Pilihan jawaban">
            {q.options!.map((o, i) => {
              const sel = rec.response === String(i);
              const state = rec.checked ? (i === q.answerIndex ? 'right' : sel ? 'wrong' : '') : '';
              return (
                <button key={i} role="radio" aria-checked={sel} disabled={rec.checked} className={`opt ${sel ? 'sel' : ''} ${state}`} onClick={() => setResponse(q.id, String(i))}>
                  <b>{String.fromCharCode(65 + i)}</b><span>{o}</span>
                  {state === 'right' && <Icon name="check" size={20} />}{state === 'wrong' && <Icon name="x" size={20} />}
                </button>
              );
            })}
          </div>
        )}
        {q.type === 'cerita' && (
          <input className="input" disabled={rec.checked || rec.grading} placeholder="Tulis jawaban singkatmu di sini" value={rec.response} onChange={e => setResponse(q.id, e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && canCheck) void checkAnswer(q.id); }} aria-label="Jawaban" />
        )}
        {q.type === 'esai' && (
          <textarea className="input" rows={5} maxLength={1200} disabled={rec.checked || rec.grading} placeholder="Tulis jawabanmu dengan kata-katamu sendiri" value={rec.response} onChange={e => setResponse(q.id, e.target.value)} aria-label="Jawaban esai" />
        )}

        {rec.grading && <Spinner label={q.type === 'esai' ? 'Guru AI sedang membaca jawabanmu...' : 'Memeriksa jawabanmu...'} />}
        {rec.note && !rec.checked && <p className="error" role="alert">{rec.note}</p>}

        {!rec.checked && !rec.grading && (
          <button className="btn btn-primary btn-lg" disabled={!canCheck} onClick={() => void checkAnswer(q.id)}>Periksa jawaban</button>
        )}
        {rec.checked && <Feedback q={q} s={s} />}
      </section>

      <div className="between">
        <button className="btn btn-ghost" disabled={s.index === 0} onClick={() => goTo(s.index - 1)}><Icon name="left" size={18} /> Sebelumnya</button>
        {rec.checked && !rec.awaitingSelf && (
          waiting ? <span className="muted"><span className="spinner sm" /> Menyiapkan soal berikutnya...</span>
          : unlimitedStuck ? <button className="btn btn-soft" onClick={() => void fetchMore()}><Icon name="refresh" size={18} /> Muat soal lagi</button>
          : <button className="btn btn-primary btn-lg" onClick={next}>{isLast && !moreComing && total !== null ? 'Lihat hasil' : 'Lanjut'} <Icon name="right" size={18} /></button>
        )}
      </div>
      {s.error && s.questions.length > 0 && <Notice tone="warn" title="Sebagian soal belum bisa dimuat">{s.error} <button className="btn btn-soft btn-sm" onClick={() => void fetchMore()}>Coba lagi</button></Notice>}
      {s.mode === 'ai' && s.loading && s.questions.length > 0 && <p className="muted small center">Guru AI masih menyiapkan soal berikutnya di latar belakang...</p>}
    </div>
  );
}
