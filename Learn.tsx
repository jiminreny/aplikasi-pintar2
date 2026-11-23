import { useApp, chapterStats, MASTERED } from '../lib/store';
import { SUBJECTS, chaptersFor } from '../data/curriculum';
import type { SubjectId } from '../types';
import { GradeToggle, PageHeader, SubjectIcon, Notice } from '../components/ui';
import { Icon } from '../components/Icon';
import { href } from '../lib/router';

export function Learn({ subject }: { subject?: string }) {
  const app = useApp();
  const meta = SUBJECTS.find(s => s.id === subject);

  if (!meta) {
    return (
      <div className="stack">
        <PageHeader title="Belajar" sub="Pilih kelas dan mata pelajaran." right={<GradeToggle grade={app.grade} />} />
        <div className="grid g2">
          {SUBJECTS.map(s => {
            const n = chaptersFor(app.grade, s.id).length;
            return (
              <a key={s.id} className={`card row-card tone-${s.color}`} href={href(`belajar/${s.id}`)}>
                <SubjectIcon id={s.id} size={30} />
                <div><strong className="big">{s.label}</strong><div className="muted">{n} bab · {s.blurb}</div></div>
                <Icon name="right" />
              </a>
            );
          })}
        </div>
        <Notice title="Tentang materi">Materi disusun mengacu pada Kurikulum Merdeka, tetapi urutan dan cakupannya belum diverifikasi sebagai urutan resmi sekolahmu. Ikuti juga arahan guru di sekolah.</Notice>
      </div>
    );
  }

  const chapters = chaptersFor(app.grade, meta.id as SubjectId);
  const stats = chapterStats(app);
  return (
    <div className="stack">
      <PageHeader title={meta.label} sub={`Kelas ${app.grade} · pilih bab dan submateri`} backBtn right={<GradeToggle grade={app.grade} />} />
      {chapters.map(c => (
        <section key={c.id} className={`card chapter tone-${meta.color}`}>
          <div className="between">
            <div>
              <p className="eyebrow">Bab {c.number}</p>
              <h2>{c.title}</h2>
              <p className="muted">{c.description}</p>
            </div>
            {stats[c.id] && <span className={`chip ${stats[c.id].best >= MASTERED ? 'chip-ok' : ''}`}>Nilai terbaik {stats[c.id].best}</span>}
          </div>
          <ul className="sublist">
            {c.subtopics.map(s => (
              <li key={s.id}>
                <a href={href(`materi/${s.id}`)}>
                  <span className={`dot ${app.learned.includes(s.id) ? 'done' : ''}`}>{app.learned.includes(s.id) ? <Icon name="check" size={14} /> : null}</span>
                  <span>{s.title}</span>
                  <Icon name="right" size={18} />
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-soft" href={href('latihan', { subject: c.subject, chapter: c.id })}><Icon name="pencil" size={18} /> Latihan bab ini</a>
        </section>
      ))}
      {chapters.length === 0 && <div className="card card-pad muted">Belum ada bab untuk pilihan ini.</div>}
    </div>
  );
}

