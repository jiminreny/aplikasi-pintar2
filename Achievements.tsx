import { useApp, BADGES, levelOf, levelName, xpInLevel, LEVEL_NAMES } from '../lib/store';
import { PageHeader, Progress, Stars } from '../components/ui';
import { Icon } from '../components/Icon';

export function Achievements() {
  const app = useApp();
  const earned = new Set(app.badges);
  return (
    <div className="stack">
      <PageHeader title="Prestasi" sub="Bintang dan lencana dari usahamu belajar." />
      <section className="grid g3">
        <div className="card stat"><Icon name="star" size={30} fill className="star on" /><div><div className="stat-num">{app.stars}</div><div className="muted">Bintang</div></div></div>
        <div className="card stat"><Icon name="sparkle" size={30} /><div><div className="stat-num">{app.xp}</div><div className="muted">Total XP</div></div></div>
        <div className="card stat"><Icon name="trophy" size={30} /><div><div className="stat-num">{levelOf(app.xp)}</div><div className="muted">{levelName(app.xp)}</div></div></div>
      </section>
      <section className="card card-pad">
        <div className="between"><strong>Menuju level {levelOf(app.xp) + 1}</strong><span className="muted">{xpInLevel(app.xp)}/100 XP</span></div>
        <Progress value={xpInLevel(app.xp)} tone="purple" />
        <p className="muted small">Level: {LEVEL_NAMES.join(' → ')}. XP didapat dari soal yang dijawab dan materi yang dibaca.</p>
      </section>
      <section>
        <h2>Lencana ({earned.size}/{BADGES.length})</h2>
        <div className="grid g3">
          {BADGES.map(b => (
            <div key={b.id} className={`card badge ${earned.has(b.id) ? 'on' : ''}`}>
              <span className="badge-ico"><Icon name={earned.has(b.id) ? 'medal' : 'lock'} size={28} /></span>
              <strong>{b.title}</strong><span className="muted small">{b.desc}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="card card-pad">
        <h2>Pencapaian belajar</h2>
        <ul className="checks">
          <li><Icon name="check" size={18} />{app.learned.length} materi sudah dipelajari</li>
          <li><Icon name="check" size={18} />{app.attempts.length} latihan dan kuis diselesaikan</li>
          <li><Icon name="check" size={18} />{app.attempts.reduce((t, a) => t + a.correct, 0)} soal dijawab tepat</li>
        </ul>
        <Stars count={Math.min(3, Math.floor(app.stars / 10))} />
        <p className="muted small">Bintang di atas bertambah setiap 10 bintang yang kamu kumpulkan.</p>
      </section>
    </div>
  );
}
