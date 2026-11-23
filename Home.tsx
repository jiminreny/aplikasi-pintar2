import { useState } from 'react';
import { useApp, update, levelOf, levelName, xpInLevel, learnedCount, recommendations } from '../lib/store';
import { SUBJECTS, findSubtopic, chapterById } from '../data/curriculum';
import { GradeToggle, Progress, SubjectIcon, Notice } from '../components/ui';
import { Icon } from '../components/Icon';
import { href } from '../lib/router';
import { useAiStatus } from '../lib/ai';

function Welcome() {
  const app = useApp();
  const [name, setName] = useState('');
  return (
    <div className="modal-back">
      <div className="modal card" role="dialog" aria-labelledby="wlc">
        <h2 id="wlc">Halo! Selamat datang di Teman Pintar</h2>
        <p className="muted">Aku akan menemanimu belajar. Siapa nama panggilanmu?</p>
        <input className="input" placeholder="Nama panggilan" maxLength={20} value={name} onChange={e => setName(e.target.value)} aria-label="Nama panggilan" />
        <p className="muted small">Kamu kelas berapa?</p>
        <GradeToggle grade={app.grade} />
        <p className="small muted">Cukup nama panggilan saja. Kami tidak meminta data pribadi lain.</p>
        <button className="btn btn-primary btn-lg" onClick={() => update(s => ({ ...s, nickname: name.trim() || 'Teman', onboarded: true }))}>Mulai belajar</button>
      </div>
    </div>
  );
}

export function Home() {
  const app = useApp();
  const ai = useAiStatus();
  const { done, total } = learnedCount(app, app.grade);
  const rec = recommendations(app, app.grade);
  const last = app.lastSubtopic ? findSubtopic(app.lastSubtopic) : undefined;
  const recChapters = [...rec.review, ...rec.fresh].slice(0, 2);
  const pct = total ? (done / total) * 100 : 0;

  return (
    <div className="stack">
      {!app.onboarded && <Welcome />}
      <section className="hero card">
        <div className="hero-text">
          <p className="eyebrow">Teman Pintar</p>
          <h1>Halo, {app.nickname || 'Teman'}! Yuk belajar hari ini.</h1>
          <p>Pilih pelajaran, baca penjelasannya, lalu coba latihannya. Salah itu tidak apa-apa, kita belajar bersama.</p>
          <div className="row">
            <GradeToggle grade={app.grade} />
          </div>
          <div className="row">
            {last ? (
              <a className="btn btn-primary btn-lg" href={href(`materi/${last.subtopic.id}`)}><Icon name="play" size={18} /> Lanjut belajar: {last.subtopic.title}</a>
            ) : (
              <a className="btn btn-primary btn-lg" href={href('belajar')}><Icon name="book" size={18} /> Mulai belajar</a>
            )}
          </div>
        </div>
        <svg className="hero-art" viewBox="0 0 220 180" aria-hidden="true">
          <rect x="30" y="40" width="150" height="110" rx="18" fill="#e7efff" />
          <rect x="46" y="58" width="118" height="14" rx="7" fill="#4f7cff" opacity=".85" />
          <rect x="46" y="82" width="90" height="10" rx="5" fill="#b9ccff" />
          <rect x="46" y="100" width="104" height="10" rx="5" fill="#b9ccff" />
          <circle cx="170" cy="40" r="26" fill="#ffd66b" />
          <path d="M170 28l4 8 9 1-6.5 6.3 1.6 9-8.1-4.3-8.1 4.3 1.6-9L157 37l9-1z" fill="#fff" />
          <circle cx="52" cy="140" r="22" fill="#c9f0dc" />
          <rect x="40" y="132" width="24" height="5" rx="2.5" fill="#34b27b" />
          <rect x="40" y="142" width="16" height="5" rx="2.5" fill="#34b27b" opacity=".6" />
          <circle cx="150" cy="150" r="14" fill="#e4dbff" />
        </svg>
      </section>

      {ai && !ai.configured && (
        <Notice tone="warn" title="Mode Demo aktif">Guru AI belum dihubungkan, jadi latihan memakai soal contoh bawaan (bukan buatan AI). Minta orang tua mengisi API key di file .env.</Notice>
      )}

      <section className="grid g3">
        <div className="card stat">
          <Icon name="star" size={28} fill className="star on" />
          <div><div className="stat-num">{app.stars}</div><div className="muted">Total bintang</div></div>
        </div>
        <div className="card stat col">
          <div className="between"><strong>Level {levelOf(app.xp)} · {levelName(app.xp)}</strong><span className="muted">{xpInLevel(app.xp)}/100 XP</span></div>
          <Progress value={xpInLevel(app.xp)} tone="purple" />
        </div>
        <div className="card stat col">
          <div className="between"><strong>Materi dipelajari</strong><span className="muted">{done}/{total}</span></div>
          <Progress value={pct} tone="green" />
        </div>
      </section>

      <section>
        <h2>Pilih pelajaran</h2>
        <div className="grid g4">
          {SUBJECTS.map(s => (
            <a key={s.id} className={`card subject tone-${s.color}`} href={href(`belajar/${s.id}`)}>
              <SubjectIcon id={s.id} />
              <strong>{s.label}</strong>
              <span className="muted">{s.blurb}</span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>Rekomendasi latihan</h2>
        {recChapters.length === 0 ? (
          <div className="card card-pad muted">Kamu sudah mencoba semua bab di kelas ini. Hebat! Coba ulangi bab favoritmu di menu Latihan.</div>
        ) : (
          <div className="grid g2">
            {recChapters.map(c => (
              <a key={c.id} className={`card row-card tone-${SUBJECTS.find(s => s.id === c.subject)!.color}`} href={href('latihan', { subject: c.subject, chapter: c.id })}>
                <SubjectIcon id={c.subject} />
                <div>
                  <strong>{c.title}</strong>
                  <div className="muted small">{rec.review.includes(c) ? 'Yuk ulangi supaya makin paham' : 'Belum pernah dicoba'}</div>
                </div>
                <Icon name="right" />
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
