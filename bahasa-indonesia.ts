import type { Chapter } from '../types';

export const BAHASA_INDONESIA: Chapter[] = [
  {
    id: 'bi4-1', grade: 4, subject: 'bahasa-indonesia', number: 1,
    title: 'Memahami Isi Bacaan',
    description: 'Menemukan ide pokok dan menjawab pertanyaan dari bacaan.',
    subtopics: [
      {
        id: 'bi4-1-a', title: 'Ide Pokok Paragraf', difficulty: 'mudah', tags: ['ide pokok', 'paragraf', 'membaca'],
        objectives: ['Menjelaskan arti ide pokok.', 'Menemukan ide pokok dan kalimat penjelas dalam paragraf.'],
        explanation: [
          'Paragraf adalah kumpulan kalimat yang membahas satu hal. Hal utama yang dibahas itu disebut ide pokok.',
          'Kalimat utama berisi ide pokok. Kalimat lainnya adalah kalimat penjelas yang memberi keterangan tambahan.',
          'Kalimat utama sering berada di awal paragraf, tetapi bisa juga di akhir.',
        ],
        everyday: 'Saat membaca pesan dari wali kelas, kita mencari hal terpenting dulu, misalnya "besok ada kerja bakti".',
        example: {
          question: 'Kucing adalah hewan peliharaan yang lucu. Bulunya halus dan lembut. Kucing suka bermain bola benang. Apa ide pokok paragraf itu?',
          steps: ['Baca semua kalimat.', 'Kalimat pertama menyebut hal umum: kucing hewan peliharaan yang lucu.', 'Kalimat lain menjelaskan sifat kucing.'],
          answer: 'Ide pokoknya: kucing adalah hewan peliharaan yang lucu.',
        },
        summary: ['Ide pokok = hal utama paragraf.', 'Kalimat utama memuat ide pokok.', 'Kalimat penjelas memberi keterangan tambahan.'],
      },
      {
        id: 'bi4-1-b', title: 'Kata Tanya untuk Memahami Bacaan', difficulty: 'mudah', tags: ['kata tanya', 'apa', 'siapa', 'mengapa'],
        objectives: ['Mengenal kata tanya apa, siapa, di mana, kapan, mengapa, dan bagaimana.', 'Menjawab pertanyaan berdasarkan isi bacaan.'],
        explanation: [
          'Kata tanya membantu kita menggali isi bacaan. Siapa menanyakan orang, di mana menanyakan tempat, kapan menanyakan waktu.',
          'Apa menanyakan benda atau kejadian, mengapa menanyakan sebab, dan bagaimana menanyakan cara atau keadaan.',
          'Jawaban harus berdasarkan isi bacaan, bukan dugaan kita.',
        ],
        everyday: 'Saat menceritakan pengalaman liburan, kita menjawab siapa yang ikut, ke mana pergi, dan kapan berangkat.',
        example: {
          question: 'Pada hari Minggu, Rina dan ayah membersihkan taman di depan rumah. Siapa yang membersihkan taman?',
          steps: ['Kata tanya "siapa" menanyakan orang.', 'Cari nama orang dalam kalimat.', 'Ada Rina dan ayah.'],
          answer: 'Rina dan ayah',
        },
        summary: ['Siapa = orang, di mana = tempat, kapan = waktu.', 'Mengapa = sebab, bagaimana = cara.'],
      },
    ],
  },
  {
    id: 'bi4-2', grade: 4, subject: 'bahasa-indonesia', number: 2,
    title: 'Kata dan Kalimat',
    description: 'Memakai kata baku dan tanda baca dengan tepat.',
    subtopics: [
      {
        id: 'bi4-2-a', title: 'Kata Baku dan Tidak Baku', difficulty: 'sedang', tags: ['kata baku', 'ejaan'],
        objectives: ['Membedakan kata baku dan tidak baku.', 'Memakai kata baku dalam kalimat.'],
        explanation: [
          'Kata baku adalah kata yang sesuai kaidah bahasa Indonesia dan dipakai dalam situasi resmi seperti pelajaran atau surat.',
          'Kata tidak baku sering dipakai dalam percakapan santai.',
          'Contoh: apotek (baku) dan apotik (tidak baku); jadwal (baku) dan jadual (tidak baku); nasihat (baku) dan nasehat (tidak baku).',
        ],
        everyday: 'Saat menulis karangan di sekolah kita memakai kata baku, sedangkan saat mengobrol dengan teman boleh lebih santai.',
        example: {
          question: 'Manakah yang baku: "risiko" atau "resiko"?',
          steps: ['Dalam KBBI, bentuk bakunya adalah "risiko".', 'Jadi "resiko" adalah bentuk tidak baku.'],
          answer: 'risiko',
        },
        summary: ['Kata baku dipakai pada situasi resmi.', 'Contoh baku: apotek, jadwal, nasihat, risiko.'],
      },
      {
        id: 'bi4-2-b', title: 'Huruf Kapital dan Tanda Baca', difficulty: 'mudah', tags: ['huruf kapital', 'tanda baca', 'titik', 'koma'],
        objectives: ['Memakai huruf kapital dengan tepat.', 'Memakai tanda titik, tanda tanya, tanda seru, dan koma.'],
        explanation: [
          'Huruf kapital dipakai pada awal kalimat, nama orang, nama tempat, nama hari, dan nama bulan.',
          'Titik (.) mengakhiri kalimat berita. Tanda tanya (?) mengakhiri kalimat tanya. Tanda seru (!) dipakai untuk perintah atau seruan.',
          'Koma (,) dipakai untuk memisahkan unsur dalam perincian, misalnya "Ibu membeli apel, jeruk, dan mangga."',
        ],
        everyday: 'Pesan yang ditulis dengan tanda baca benar lebih mudah dipahami, misalnya "Ayo, makan, Dik!" berbeda arti dengan "Ayo makan Dik!".',
        example: {
          question: 'Perbaiki kalimat: "ibu membeli apel jeruk dan mangga di pasar"',
          steps: ['Awal kalimat memakai huruf kapital: Ibu.', 'Perincian dipisahkan koma: apel, jeruk, dan mangga.', 'Akhiri dengan titik.'],
          answer: 'Ibu membeli apel, jeruk, dan mangga di pasar.',
        },
        summary: ['Kapital untuk awal kalimat dan nama.', 'Titik, tanda tanya, tanda seru mengakhiri kalimat.', 'Koma memisahkan perincian.'],
      },
    ],
  },
  {
    id: 'bi5-1', grade: 5, subject: 'bahasa-indonesia', number: 1,
    title: 'Teks Narasi dan Deskripsi',
    description: 'Memahami unsur cerita dan menulis deskripsi dengan pancaindra.',
    subtopics: [
      {
        id: 'bi5-1-a', title: 'Unsur Cerita', difficulty: 'sedang', tags: ['tokoh', 'latar', 'alur', 'amanat', 'narasi'],
        objectives: ['Menyebutkan unsur cerita: tokoh, latar, alur, dan amanat.', 'Menemukan unsur-unsur itu dalam sebuah cerita pendek.'],
        explanation: [
          'Tokoh adalah pelaku dalam cerita. Latar adalah tempat, waktu, dan suasana kejadian.',
          'Alur adalah urutan kejadian dari awal, tengah (masalah), sampai akhir (penyelesaian).',
          'Amanat adalah pesan yang bisa kita ambil dari cerita.',
        ],
        everyday: 'Saat menceritakan film yang kamu tonton, kamu otomatis menyebut siapa tokohnya, di mana kejadiannya, dan apa pesannya.',
        example: {
          question: 'Dina menemukan dompet di taman sekolah pada pagi hari. Ia segera menyerahkannya kepada guru. Apa amanat cerita tersebut?',
          steps: ['Perhatikan perbuatan tokoh: Dina menyerahkan dompet temuan.', 'Perbuatan baik itu mengajarkan sifat jujur.'],
          answer: 'Kita harus jujur dan mengembalikan barang yang bukan milik kita.',
        },
        summary: ['Tokoh = pelaku.', 'Latar = tempat, waktu, suasana.', 'Alur = urutan kejadian.', 'Amanat = pesan.'],
      },
      {
        id: 'bi5-1-b', title: 'Teks Deskripsi dengan Pancaindra', difficulty: 'sedang', tags: ['deskripsi', 'pancaindra'],
        objectives: ['Menjelaskan ciri teks deskripsi.', 'Menulis kalimat deskripsi memakai pancaindra.'],
        explanation: [
          'Teks deskripsi menggambarkan suatu benda, tempat, atau orang sehingga pembaca seolah-olah melihatnya.',
          'Kita memakai pancaindra: penglihatan (warna, bentuk), pendengaran (suara), penciuman (bau), pengecap (rasa), dan peraba (halus, kasar).',
          'Gunakan kata sifat yang tepat, misalnya harum, renyah, kasar, dan luas.',
        ],
        everyday: 'Saat menggambarkan kue kesukaanmu, kamu bisa bilang: aromanya harum, rasanya manis, dan teksturnya lembut.',
        example: {
          question: 'Tulis satu kalimat deskripsi tentang jeruk menggunakan indra pengecap.',
          steps: ['Pilih indra: pengecap (rasa).', 'Pilih kata sifat: manis, segar, asam.', 'Susun kalimat.'],
          answer: 'Jeruk itu rasanya manis dan segar.',
        },
        summary: ['Deskripsi = menggambarkan dengan kata-kata.', 'Gunakan pancaindra.', 'Pilih kata sifat yang tepat.'],
      },
    ],
  },
  {
    id: 'bi5-2', grade: 5, subject: 'bahasa-indonesia', number: 2,
    title: 'Kosakata dan Kata Berimbuhan',
    description: 'Memahami sinonim, antonim, serta imbuhan ber- dan me-.',
    subtopics: [
      {
        id: 'bi5-2-a', title: 'Sinonim dan Antonim', difficulty: 'mudah', tags: ['sinonim', 'antonim', 'kosakata'],
        objectives: ['Menyebutkan sinonim (persamaan kata).', 'Menyebutkan antonim (lawan kata).'],
        explanation: [
          'Sinonim adalah kata yang maknanya hampir sama. Contoh: cantik = indah, besar = raya.',
          'Antonim adalah kata yang maknanya berlawanan. Contoh: tinggi >< rendah, rajin >< malas.',
          'Memakai sinonim membuat tulisan tidak membosankan karena kata tidak diulang-ulang.',
        ],
        everyday: 'Daripada menulis "senang" berulang-ulang, kamu bisa memakai "gembira" atau "bahagia".',
        example: {
          question: 'Tentukan antonim dari kata "rajin".',
          steps: ['Rajin artinya sungguh-sungguh mengerjakan sesuatu.', 'Lawan katanya adalah tidak mau bekerja.'],
          answer: 'malas',
        },
        summary: ['Sinonim = persamaan kata.', 'Antonim = lawan kata.'],
      },
      {
        id: 'bi5-2-b', title: 'Kata Berimbuhan ber- dan me-', difficulty: 'sedang', tags: ['imbuhan', 'ber-', 'me-', 'afiks'],
        objectives: ['Mengenal imbuhan ber- dan me-.', 'Membentuk kata berimbuhan dan memakainya dalam kalimat.'],
        explanation: [
          'Imbuhan adalah bagian yang ditambahkan pada kata dasar sehingga maknanya berubah.',
          'Imbuhan ber- sering bermakna memiliki atau melakukan. Contoh: ber + sepeda = bersepeda, ber + lari = berlari.',
          'Imbuhan me- sering bermakna melakukan pekerjaan. Contoh: me + nulis = menulis, me + baca = membaca, me + sapu = menyapu.',
        ],
        everyday: 'Kita berkata "Adik bersepeda" (melakukan kegiatan) dan "Ibu menyapu halaman" (melakukan pekerjaan).',
        example: {
          question: 'Bentuklah kata berimbuhan dari kata dasar "tulis" dan "lari" lalu pakai dalam kalimat.',
          steps: ['tulis + me- = menulis.', 'lari + ber- = berlari.'],
          answer: 'Aku menulis surat. Adi berlari di lapangan.',
        },
        summary: ['Imbuhan mengubah makna kata dasar.', 'Contoh ber-: bersepeda. Contoh me-: menulis.'],
      },
    ],
  },
];
