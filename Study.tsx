import { useEffect, useState } from 'react';
import { findSubtopic, allSubtopics } from '../data/curriculum';
import { PageHeader, SubjectIcon, subjectMeta } from '../components/ui';
import { Icon } from '../components/Icon';
import { href } from '../lib/router';
import { markLearned, update, useApp } from '../lib/store';

export function Study({ id }: { id: string }) {
  const app = useApp();
  const found = findSubtopic(id);
  const [shown, setShown] = useState(0);
  const [badgeMsg, setBadgeMsg] = useState<string[]>([]);

  useEffect(() => {
    setShown(0);
    setBadgeMsg([]);
    if (found) update(s => ({ ...s, lastSubtopic: id, grade: found.chapter.grade }));
  }, [id]);

  if (!found) return <div className="card card-pad">Materi tidak ditemukan. <a href={href('belajar')}>Kembali ke Belajar</a></div>;
  const { chapter, subtopic: s } = found;
  const meta = subjectMeta(chapter.subject);
  const list = allSubtopics(chapter.grade).filter(x => x.chapter.subject === chapter.subject);
  const idx = list.findIndex(x => x.subtopic.id === id);
  const prev = list[idx - 1], next = list[idx + 1];
  const learned = app.learned.includes(id);

  return (
    <article className="stack study">
      <PageHeader title={s.title} sub={`${meta.label} · Kelas ${chapter.grade} · Bab ${chapter.number}: ${chapter.title}`} backBtn right={<SubjectIcon id={chapter.subject} size={30} />} />

      <section className="card card-pad">
        <h2>Tujuan belajar</h2>
        <ul className="checks">{s.objectives.map((o, i) => <li key={i}><Icon name="check" size={18} />{o}</li>)}</ul>
      </section>

      <section className="card card-pad">
        <h2>Penjelasan</h2>
        {s.explanation.map((p, i) => <p key={i} className="read">{p}</p>)}
      </section>

      <section className="callout">
        <Icon name="bulb" size={26} />
        <div><h3>Dalam kehidupan sehari-hari</h3><p>{s.everyday}</p></div>
      </section>

      <section className="card card-pad">
        <h2>Contoh soal</h2>
        <p className="read"><strong>{s.example.question}</strong></p>
        <ol className="steps">
          {s.example.steps.slice(0, shown).map((st, i) => <li key={i}>{st}</li>)}
        </ol>
        {shown < s.example.steps.length ? (
          <button className="btn btn-soft" onClick={() => setShown(shown + 1)}>{shown === 0 ? 'Lihat langkah pertama' : 'Lihat langkah berikutnya'}</button>
        ) : (
          <div className="answer-box"><span>Jawaban:</span> <strong>{s.example.answer}</strong></div>
        )}
        {shown < s.example.steps.length && shown > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setShown(s.example.steps.length)}>Tampilkan semuanya</button>}
      </section>

      <section className="card card-pad">
        <h2>Ringkasan</h2>
        <ul className="checks">{s.summary.map((o, i) => <li key={i}><Icon name="star" size={16} fill />{o}</li>)}</ul>
      </section>

      <section className="card card-pad cta">
        <a className="btn btn-primary btn-lg" href={href('latihan', { subject: chapter.subject, chapter: chapter.id, sub: s.id })} onClick={() => { markLearned(id); }}>
          <Icon name="pencil" size={18} /> Mulai latihan
        </a>
        <button className={`btn ${learned ? 'btn-ok' : 'btn-soft'}`} disabled={learned} onClick={() => setBadgeMsg(markLearned(id))}>
          <Icon name="check" size={18} /> {learned ? 'Sudah dipelajari' : 'Saya sudah paham materi ini (+5 XP)'}
        </button>
        {badgeMsg.length > 0 && <p className="ok">Lencana baru didapat! Lihat di menu Prestasi.</p>}
      </section>

      <nav className="between pager">
        {prev ? <a className="btn btn-ghost" href={href(`materi/${prev.subtopic.id}`)}><Icon name="left" size={18} /> {prev.subtopic.title}</a> : <span />}
        {next ? <a className="btn btn-ghost" href={href(`materi/${next.subtopic.id}`)}>{next.subtopic.title} <Icon name="right" size={18} /></a> : <span />}
      </nav>
    </article>
  );
}
