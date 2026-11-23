# Teman Pintar

Aplikasi belajar interaktif untuk anak kelas 4 dan 5 SD (Matematika, Bahasa Indonesia, Bahasa Inggris, IPAS).
Stack: React + TypeScript (dibangun dengan esbuild) dan server Node kecil (tsx). Progres disimpan di localStorage.

## Instalasi dan menjalankan
    npm install
    npm run build
    npm start          # buka http://localhost:3000

## Menghubungkan AI
    cp .env.example .env
Isi `AI_API_KEY` (dan `AI_PROVIDER=anthropic` atau `openai`, `AI_MODEL`, `AI_BASE_URL` bila perlu), lalu jalankan ulang `npm start`.
API key hanya dibaca server (tidak pernah dikirim ke browser). Tanpa key, aplikasi memakai **Mode Demo** (bank soal bawaan, ditandai jelas).

## Menguji
    npm test           # tes logika (kalkulasi, validasi soal, sesi)
Uji generator: Latihan -> pilih bab -> Mulai. Badge "Mode Demo" tampil bila AI belum aktif.

## Struktur
- `src/data/` materi per mata pelajaran (terpisah dari UI, mudah diedit)
- `src/pages/` halaman (Beranda, Belajar, Latihan, Evaluasi, Prestasi, Profil, Sesi, Hasil)
- `src/lib/` store progres, sesi latihan, kalkulasi, router
- `server/` API route AI (`/api/generate`, `/api/grade`, `/api/status`) + rate limit
