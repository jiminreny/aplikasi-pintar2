import type { Chapter } from '../types';

export const IPAS: Chapter[] = [
  {
    id: 'ip4-1', grade: 4, subject: 'ipas', number: 1,
    title: 'Tumbuhan dan Lingkungannya',
    description: 'Mengenal bagian tumbuhan dan hubungan makan-memakan.',
    subtopics: [
      {
        id: 'ip4-1-a', title: 'Bagian Tumbuhan dan Fungsinya', difficulty: 'mudah', tags: ['tumbuhan', 'akar', 'batang', 'daun'],
        objectives: ['Menyebutkan bagian utama tumbuhan.', 'Menjelaskan fungsi akar, batang, daun, dan bunga.'],
        explanation: [
          'Akar menyerap air dan zat hara dari dalam tanah serta menegakkan tumbuhan.',
          'Batang menopang tumbuhan dan mengangkut air serta zat makanan. Daun membuat makanan lewat fotosintesis dengan bantuan cahaya matahari.',
          'Bunga adalah alat perkembangbiakan. Dari bunga dapat tumbuh buah dan biji.',
        ],
        everyday: 'Tanaman cabai di pot akan layu jika tidak disiram karena akarnya tidak mendapat air.',
        example: {
          question: 'Bagian tumbuhan apa yang berfungsi menyerap air dari tanah?',
          steps: ['Air berada di dalam tanah.', 'Bagian yang berada di dalam tanah adalah akar.'],
          answer: 'Akar',
        },
        summary: ['Akar menyerap air.', 'Batang menopang dan mengangkut.', 'Daun membuat makanan.', 'Bunga untuk berkembang biak.'],
      },
      {
        id: 'ip4-1-b', title: 'Rantai Makanan', difficulty: 'sedang', tags: ['rantai makanan', 'produsen', 'konsumen', 'pengurai'],
        objectives: ['Menjelaskan arti rantai makanan.', 'Menyusun rantai makanan sederhana.'],
        explanation: [
          'Rantai makanan menunjukkan perpindahan energi dari satu makhluk hidup ke makhluk hidup lain yang memakannya.',
          'Produsen adalah makhluk hidup yang membuat makanan sendiri, yaitu tumbuhan. Konsumen adalah makhluk hidup yang memakan makhluk lain.',
          'Pengurai, seperti jamur dan bakteri, mengurai makhluk hidup yang mati menjadi zat hara tanah.',
        ],
        everyday: 'Di sawah ada rantai makanan: padi → tikus → ular → elang.',
        example: {
          question: 'Pada rantai makanan padi → tikus → ular → elang, siapa produsennya?',
          steps: ['Produsen membuat makanan sendiri.', 'Padi adalah tumbuhan.'],
          answer: 'Padi',
        },
        summary: ['Rantai makanan dimulai dari produsen (tumbuhan).', 'Konsumen memakan makhluk lain.', 'Pengurai mengurai sisa makhluk hidup.'],
      },
    ],
  },
  {
    id: 'ip4-2', grade: 4, subject: 'ipas', number: 2,
    title: 'Wujud Zat dan Perubahannya',
    description: 'Mengenal padat, cair, gas, serta perubahan wujud.',
    subtopics: [
      {
        id: 'ip4-2-a', title: 'Tiga Wujud Zat', difficulty: 'mudah', tags: ['wujud zat', 'padat', 'cair', 'gas'],
        objectives: ['Menyebutkan tiga wujud zat.', 'Menjelaskan ciri zat padat, cair, dan gas.'],
        explanation: [
          'Zat padat memiliki bentuk dan volume tetap, misalnya batu dan buku.',
          'Zat cair memiliki volume tetap tetapi bentuknya mengikuti wadah, misalnya air dan minyak.',
          'Gas bentuk dan volumenya berubah mengikuti ruang, misalnya udara dan uap air.',
        ],
        everyday: 'Air dituang ke gelas atau botol, bentuknya mengikuti wadah. Itu ciri zat cair.',
        example: {
          question: 'Termasuk wujud apa air di dalam gelas?',
          steps: ['Air mengikuti bentuk gelas.', 'Volumenya tetap.'],
          answer: 'Zat cair',
        },
        summary: ['Padat: bentuk dan volume tetap.', 'Cair: bentuk berubah, volume tetap.', 'Gas: bentuk dan volume berubah.'],
      },
      {
        id: 'ip4-2-b', title: 'Perubahan Wujud Zat', difficulty: 'sedang', tags: ['mencair', 'membeku', 'menguap', 'mengembun'],
        objectives: ['Menyebutkan jenis perubahan wujud zat.', 'Menjelaskan penyebab perubahan wujud pada contoh sehari-hari.'],
        explanation: [
          'Mencair: padat menjadi cair karena dipanaskan, contohnya es batu meleleh. Membeku: cair menjadi padat karena didinginkan.',
          'Menguap: cair menjadi gas karena dipanaskan, contohnya air mendidih. Mengembun: gas menjadi cair karena didinginkan.',
          'Perubahan wujud terjadi karena zat menerima atau melepas panas.',
        ],
        everyday: 'Titik air di luar gelas es teh terjadi karena uap air di udara mengembun saat bertemu gelas yang dingin.',
        example: {
          question: 'Es batu di dalam gelas berubah menjadi air. Perubahan apa itu?',
          steps: ['Es batu adalah zat padat.', 'Air adalah zat cair.', 'Padat menjadi cair disebut mencair.'],
          answer: 'Mencair',
        },
        summary: ['Mencair: padat → cair.', 'Membeku: cair → padat.', 'Menguap: cair → gas.', 'Mengembun: gas → cair.'],
      },
    ],
  },
  {
    id: 'ip5-1', grade: 5, subject: 'ipas', number: 1,
    title: 'Organ Tubuh Manusia',
    description: 'Mengenal sistem pencernaan dan pernapasan.',
    subtopics: [
      {
        id: 'ip5-1-a', title: 'Sistem Pencernaan', difficulty: 'sedang', tags: ['pencernaan', 'lambung', 'usus'],
        objectives: ['Menyebutkan urutan organ pencernaan.', 'Menjelaskan fungsi organ pencernaan secara sederhana.'],
        explanation: [
          'Makanan masuk melalui mulut, lalu ke kerongkongan, lambung, usus halus, usus besar, dan berakhir di anus.',
          'Di mulut makanan dikunyah dan dicampur air liur. Di lambung makanan dihaluskan. Di usus halus sari makanan diserap tubuh.',
          'Usus besar menyerap air dari sisa makanan. Sisa yang tidak dipakai dibuang sebagai tinja.',
        ],
        everyday: 'Mengunyah makanan sampai halus membantu pencernaan bekerja lebih ringan.',
        example: {
          question: 'Di organ apa sari makanan diserap oleh tubuh?',
          steps: ['Makanan dicerna di lambung.', 'Penyerapan sari makanan terjadi di usus halus.'],
          answer: 'Usus halus',
        },
        summary: ['Urutan: mulut → kerongkongan → lambung → usus halus → usus besar → anus.', 'Usus halus menyerap sari makanan.'],
      },
      {
        id: 'ip5-1-b', title: 'Sistem Pernapasan', difficulty: 'sedang', tags: ['pernapasan', 'paru-paru', 'oksigen'],
        objectives: ['Menyebutkan organ pernapasan.', 'Menjelaskan proses pertukaran udara di paru-paru.'],
        explanation: [
          'Udara masuk melalui hidung, tenggorokan, batang tenggorok, bronkus, lalu ke paru-paru.',
          'Saat menarik napas, kita memasukkan oksigen. Saat mengembuskan napas, kita mengeluarkan karbon dioksida.',
          'Jaga pernapasan dengan menggunakan masker saat udara berdebu dan tidak merokok.',
        ],
        everyday: 'Saat berlari napasmu lebih cepat karena tubuh membutuhkan lebih banyak oksigen.',
        example: {
          question: 'Gas apa yang kita keluarkan saat mengembuskan napas?',
          steps: ['Menarik napas memasukkan oksigen.', 'Mengembuskan napas mengeluarkan karbon dioksida.'],
          answer: 'Karbon dioksida',
        },
        summary: ['Udara masuk lewat hidung sampai paru-paru.', 'Oksigen masuk, karbon dioksida keluar.'],
      },
    ],
  },
  {
    id: 'ip5-2', grade: 5, subject: 'ipas', number: 2,
    title: 'Air dan Energi',
    description: 'Memahami siklus air dan sumber energi.',
    subtopics: [
      {
        id: 'ip5-2-a', title: 'Siklus Air', difficulty: 'sedang', tags: ['siklus air', 'penguapan', 'hujan'],
        objectives: ['Menyebutkan tahapan siklus air.', 'Menjelaskan perubahan wujud air dalam siklus air.'],
        explanation: [
          'Panas matahari membuat air laut, sungai, dan danau menguap menjadi uap air.',
          'Uap air naik, bertemu udara dingin, lalu mengembun membentuk awan.',
          'Awan yang berat menjatuhkan air sebagai hujan. Air hujan mengalir ke sungai, laut, atau meresap ke tanah, lalu siklus berulang.',
        ],
        everyday: 'Jemuran kering karena air di pakaian menguap terkena panas matahari.',
        example: {
          question: 'Apa nama proses ketika uap air berubah menjadi titik-titik air membentuk awan?',
          steps: ['Uap air adalah gas.', 'Gas menjadi cair karena dingin.', 'Perubahan itu disebut mengembun.'],
          answer: 'Pengembunan',
        },
        summary: ['Urutan: penguapan → pengembunan (awan) → hujan → mengalir/meresap.', 'Siklus air terus berulang.'],
      },
      {
        id: 'ip5-2-b', title: 'Sumber Energi', difficulty: 'sedang', tags: ['energi', 'terbarukan', 'tak terbarukan'],
        objectives: ['Membedakan energi terbarukan dan tak terbarukan.', 'Memberi contoh penghematan energi.'],
        explanation: [
          'Energi terbarukan berasal dari sumber yang tidak habis atau cepat pulih, misalnya matahari, angin, dan air.',
          'Energi tak terbarukan berasal dari sumber yang dapat habis, misalnya minyak bumi, batu bara, dan gas alam.',
          'Kita perlu menghemat energi, misalnya mematikan lampu yang tidak dipakai.',
        ],
        everyday: 'Panel surya di atap rumah memanfaatkan sinar matahari sebagai sumber energi listrik.',
        example: {
          question: 'Apakah angin termasuk energi terbarukan atau tak terbarukan?',
          steps: ['Angin selalu ada dan tidak habis dipakai.', 'Sumber seperti ini disebut terbarukan.'],
          answer: 'Terbarukan',
        },
        summary: ['Terbarukan: matahari, angin, air.', 'Tak terbarukan: minyak bumi, batu bara, gas alam.', 'Hemat energi itu penting.'],
      },
    ],
  },
];
