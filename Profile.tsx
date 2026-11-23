import { useState } from 'react';
import { useApp, update, resetAll } from '../lib/store';
import { clearSession } from '../lib/session';
import { GradeToggle, PageHeader, Notice } from '../components/ui';
import { useAiStatus } from '../lib/ai';

export function Profile() {
  const app = useApp();
  const ai = useAiStatus();
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="stack">
      <PageHeader title="Profil" sub="Pengaturan dasar." />
      <section className="card card-pad form">
        <label htmlFor="nick"><strong>Nama panggilan</strong></label>
        <input id="nick" className="input" maxLength={20} value={app.nickname} placeholder="Nama panggilan" onChange={e => update(s => ({ ...s, nickname: e.target.value }))} />
        <strong>Kelas</strong>
        <GradeToggle grade={app.grade} />
      </section>

      <section className="card card-pad">
        <h2>Untuk orang tua</h2>
        <ul className="plain">
          <li>Progres belajar disimpan hanya di peramban (browser) perangkat ini. Tidak ada akun, iklan, atau data pribadi yang dikumpulkan.</li>
          <li>Status guru AI: {ai === null ? 'memeriksa...' : ai.configured ? `aktif (${ai.provider})` : 'belum dikonfigurasi, aplikasi memakai Mode Demo.'}</li>
          <li>Materi mengacu pada Kurikulum Merdeka namun urutannya belum diverifikasi sebagai urutan resmi. Penilaian AI, terutama esai, tidak selalu sempurna; dampingi anak saat memeriksa hasilnya.</li>
        </ul>
        {ai && !ai.configured && <Notice tone="warn" title="Cara mengaktifkan AI">Salin .env.example menjadi .env, isi AI_API_KEY, lalu jalankan ulang server.</Notice>}
      </section>

      <section className="card card-pad">
        <h2>Hapus data</h2>
        <p className="muted">Menghapus semua bintang, XP, lencana, dan riwayat di perangkat ini.</p>
        {!confirm ? <button className="btn btn-soft" onClick={() => setConfirm(true)}>Hapus semua progres</button> : (
          <div className="row"><button className="btn btn-danger" onClick={() => { clearSession(); resetAll(); setConfirm(false); }}>Ya, hapus</button><button className="btn btn-ghost" onClick={() => setConfirm(false)}>Batal</button></div>
        )}
      </section>
    </div>
  );
}
