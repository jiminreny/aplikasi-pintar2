import type { Chapter } from '../types';

export const MATEMATIKA: Chapter[] = [
  // ===== KELAS 4 =====
  {
    id: 'mat4-1', grade: 4, subject: 'matematika', number: 1,
    title: 'Operasi Hitung Bilangan Cacah',
    description: 'Menghitung dengan bilangan besar: tambah, kurang, kali, dan bagi.',
    subtopics: [
      {
        id: 'mat4-1-a', title: 'Penjumlahan dan Pengurangan Bersusun', difficulty: 'mudah', tags: ['penjumlahan', 'pengurangan', 'bersusun', 'bilangan cacah'],
        objectives: ['Menjumlah bilangan sampai 10.000 dengan cara bersusun.', 'Mengurangi bilangan sampai 10.000 dengan cara bersusun, termasuk meminjam.'],
        explanation: [
          'Cara bersusun artinya angka ditulis ke bawah. Angka satuan dengan satuan, puluhan dengan puluhan, ratusan dengan ratusan, dan ribuan dengan ribuan.',
          'Mulailah menghitung dari kolom paling kanan (satuan). Jika hasil penjumlahan lebih dari 9, tulis angka satuannya dan simpan sisanya ke kolom kiri. Ini disebut menyimpan.',
          'Pada pengurangan, jika angka atas lebih kecil dari angka bawah, kita meminjam 1 dari kolom di sebelah kirinya. Pinjaman itu bernilai 10 di kolom yang sedang dihitung.',
        ],
        everyday: 'Saat membayar belanjaan di warung, ibu menjumlahkan harga barang satu per satu. Saat menerima uang kembalian, kita sebenarnya sedang mengurangi.',
        example: {
          question: 'Minggu lalu toko Bu Sari menjual 3.450 bungkus mi. Minggu ini terjual 2.875 bungkus. Berapa total bungkus mi yang terjual?',
          steps: ['Tulis bersusun: 3.450 di atas, 2.875 di bawah.', 'Satuan: 0 + 5 = 5.', 'Puluhan: 5 + 7 = 12. Tulis 2, simpan 1.', 'Ratusan: 4 + 8 + 1 (simpanan) = 13. Tulis 3, simpan 1.', 'Ribuan: 3 + 2 + 1 (simpanan) = 6.'],
          answer: '6.325 bungkus',
        },
        summary: ['Tulis angka sejajar sesuai nilai tempatnya.', 'Hitung dari kolom paling kanan.', 'Menyimpan pada penjumlahan, meminjam pada pengurangan.'],
      },
      {
        id: 'mat4-1-b', title: 'Perkalian dan Pembagian', difficulty: 'sedang', tags: ['perkalian', 'pembagian', 'bilangan cacah'],
        objectives: ['Mengalikan bilangan dua angka dengan bilangan dua angka.', 'Membagi bilangan sampai tiga angka dengan bilangan satu atau dua angka.'],
        explanation: [
          'Perkalian adalah penjumlahan berulang. 4 × 3 berarti 4 + 4 + 4. Untuk bilangan besar, kita pecah dahulu: 24 × 15 = (24 × 10) + (24 × 5).',
          'Pembagian adalah kebalikan perkalian. Jika 12 × 13 = 156, maka 156 : 12 = 13.',
          'Pembagian juga berarti membagi sama banyak. Jika ada 156 butir kelereng dibagi ke 12 anak sama banyak, tiap anak mendapat 13 butir.',
        ],
        everyday: 'Satu kotak berisi 24 permen. Jika ada 15 kotak, kita memakai perkalian. Jika permen dibagi sama rata ke teman-teman, kita memakai pembagian.',
        example: {
          question: 'Satu kotak berisi 24 permen. Ada 15 kotak. Berapa banyak permen seluruhnya?',
          steps: ['Perkalian: 24 × 15.', '24 × 10 = 240.', '24 × 5 = 120.', 'Jumlahkan: 240 + 120 = 360.'],
          answer: '360 permen',
        },
        summary: ['Perkalian = penjumlahan berulang.', 'Pecah angka besar agar mudah, misalnya 15 = 10 + 5.', 'Pembagian adalah kebalikan perkalian.'],
      },
    ],
  },
  {
    id: 'mat4-2', grade: 4, subject: 'matematika', number: 2,
    title: 'Pecahan',
    description: 'Mengenal pecahan senilai dan cara membandingkan pecahan.',
    subtopics: [
      {
        id: 'mat4-2-a', title: 'Pecahan Senilai', difficulty: 'sedang', tags: ['pecahan', 'senilai'],
        objectives: ['Menjelaskan arti pecahan senilai.', 'Membuat pecahan senilai dengan mengalikan atau membagi pembilang dan penyebut.'],
        explanation: [
          'Pecahan senilai adalah pecahan yang tampak berbeda tetapi nilainya sama. Contoh: setengah pizza sama dengan 2 dari 4 potong pizza, jadi 1/2 = 2/4.',
          'Untuk membuatnya, kalikan pembilang dan penyebut dengan bilangan yang sama (bukan nol). 1/2 × 3/3 = 3/6.',
          'Kita juga bisa membagi pembilang dan penyebut dengan bilangan yang sama untuk menyederhanakan pecahan. 4/8 dibagi 4 menjadi 1/2.',
        ],
        everyday: 'Dua potong dari roti yang dipotong empat bagian sama besarnya dengan satu potong dari roti yang dipotong dua bagian.',
        example: {
          question: 'Apakah 2/3 senilai dengan 8/12?',
          steps: ['Lihat penyebutnya: 3 menjadi 12, berarti dikali 4.', 'Kalikan pembilang dengan 4 juga: 2 × 4 = 8.', 'Hasilnya 8/12, sama dengan pecahan yang ditanyakan.'],
          answer: 'Ya, 2/3 senilai dengan 8/12.',
        },
        summary: ['Pecahan senilai punya nilai yang sama.', 'Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama.'],
      },
      {
        id: 'mat4-2-b', title: 'Membandingkan Pecahan', difficulty: 'sedang', tags: ['pecahan', 'membandingkan'],
        objectives: ['Membandingkan dua pecahan dengan penyebut sama.', 'Membandingkan dua pecahan dengan penyebut berbeda dengan menyamakan penyebut.'],
        explanation: [
          'Jika penyebutnya sama, pecahan yang pembilangnya lebih besar nilainya lebih besar. 5/8 lebih besar dari 3/8.',
          'Jika penyebutnya berbeda, samakan dahulu penyebutnya dengan pecahan senilai, lalu bandingkan pembilangnya.',
          'Gunakan tanda: > (lebih besar), < (lebih kecil), dan = (sama dengan).',
        ],
        everyday: 'Jika kamu makan 1/2 bagian kue dan temanmu makan 1/4 bagian kue yang sama besar, kamu makan lebih banyak.',
        example: {
          question: 'Manakah yang lebih besar, 2/3 atau 3/4?',
          steps: ['Penyebut 3 dan 4. Samakan menjadi 12.', '2/3 = 8/12 (dikali 4).', '3/4 = 9/12 (dikali 3).', 'Bandingkan: 9/12 > 8/12.'],
          answer: '3/4 lebih besar dari 2/3.',
        },
        summary: ['Penyebut sama: lihat pembilang.', 'Penyebut beda: samakan penyebut dahulu.'],
      },
    ],
  },
  {
    id: 'mat4-3', grade: 4, subject: 'matematika', number: 3,
    title: 'Keliling dan Luas',
    description: 'Menghitung keliling dan luas persegi serta persegi panjang.',
    subtopics: [
      {
        id: 'mat4-3-a', title: 'Keliling Persegi dan Persegi Panjang', difficulty: 'sedang', tags: ['keliling', 'persegi', 'persegi panjang', 'bangun datar'],
        objectives: ['Menjelaskan arti keliling.', 'Menghitung keliling persegi dan persegi panjang.'],
        explanation: [
          'Keliling adalah panjang garis yang mengelilingi sebuah bangun. Bayangkan kamu berjalan satu putaran mengitari lapangan.',
          'Persegi punya empat sisi sama panjang. Keliling persegi = 4 × sisi.',
          'Persegi panjang punya dua sisi panjang dan dua sisi lebar. Keliling = 2 × (panjang + lebar).',
        ],
        everyday: 'Pak Tani ingin memagari kebunnya. Panjang pagar yang dibutuhkan sama dengan keliling kebun.',
        example: {
          question: 'Kebun berbentuk persegi panjang dengan panjang 12 m dan lebar 8 m. Berapa keliling kebun?',
          steps: ['Rumus: keliling = 2 × (panjang + lebar).', 'Jumlahkan dahulu: 12 + 8 = 20.', 'Kalikan 2: 2 × 20 = 40.'],
          answer: '40 meter',
        },
        summary: ['Keliling = panjang garis di sekeliling bangun.', 'Persegi: 4 × sisi.', 'Persegi panjang: 2 × (p + l).'],
      },
      {
        id: 'mat4-3-b', title: 'Luas Persegi dan Persegi Panjang', difficulty: 'sedang', tags: ['luas', 'persegi', 'persegi panjang', 'bangun datar'],
        objectives: ['Menjelaskan arti luas.', 'Menghitung luas persegi dan persegi panjang.'],
        explanation: [
          'Luas adalah besar permukaan datar suatu bangun. Satuannya adalah satuan persegi, misalnya cm² atau m².',
          'Luas persegi = sisi × sisi.',
          'Luas persegi panjang = panjang × lebar.',
        ],
        everyday: 'Untuk memasang keramik di lantai kamar, kita perlu tahu luas lantai agar jumlah keramik tidak kurang.',
        example: {
          question: 'Lantai ruang kelas berbentuk persegi panjang dengan panjang 6 m dan lebar 4 m. Berapa luasnya?',
          steps: ['Rumus: luas = panjang × lebar.', '6 × 4 = 24.', 'Satuannya meter persegi (m²).'],
          answer: '24 m²',
        },
        summary: ['Luas = besar permukaan datar.', 'Persegi: sisi × sisi.', 'Persegi panjang: p × l.', 'Keliling memakai satuan panjang, luas memakai satuan persegi.'],
      },
    ],
  },

  // ===== KELAS 5 =====
  {
    id: 'mat5-1', grade: 5, subject: 'matematika', number: 1,
    title: 'Pecahan, Desimal, dan Persen',
    description: 'Menghitung pecahan berpenyebut berbeda dan mengubahnya ke desimal serta persen.',
    subtopics: [
      {
        id: 'mat5-1-a', title: 'Menjumlah dan Mengurangi Pecahan', difficulty: 'sedang', tags: ['pecahan', 'penjumlahan', 'pengurangan', 'penyebut berbeda'],
        objectives: ['Menjumlah pecahan berpenyebut berbeda.', 'Mengurangi pecahan berpenyebut berbeda.'],
        explanation: [
          'Pecahan hanya bisa dijumlah atau dikurang jika penyebutnya sama. Jika berbeda, samakan dahulu dengan pecahan senilai.',
          'Cari kelipatan persekutuan terkecil dari kedua penyebut sebagai penyebut baru. Untuk 2 dan 3, penyebut barunya 6.',
          'Setelah penyebut sama, jumlahkan atau kurangkan pembilangnya saja. Penyebutnya tetap.',
        ],
        everyday: 'Jika kamu minum 1/2 liter susu pagi hari dan 1/3 liter sore hari, kamu bisa menghitung total susu yang diminum.',
        example: {
          question: 'Ayu minum 1/2 liter susu pagi hari dan 1/3 liter sore hari. Berapa liter total susu yang diminum Ayu?',
          steps: ['Samakan penyebut menjadi 6.', '1/2 = 3/6 dan 1/3 = 2/6.', '3/6 + 2/6 = 5/6.'],
          answer: '5/6 liter',
        },
        summary: ['Samakan penyebut dahulu.', 'Jumlah atau kurang pembilangnya.', 'Penyebut tidak dijumlahkan.'],
      },
      {
        id: 'mat5-1-b', title: 'Pecahan, Desimal, dan Persen', difficulty: 'sedang', tags: ['pecahan', 'desimal', 'persen'],
        objectives: ['Mengubah pecahan menjadi bilangan desimal.', 'Mengubah pecahan menjadi persen dan sebaliknya.'],
        explanation: [
          'Pecahan, desimal, dan persen adalah tiga cara menulis nilai yang sama. Contoh: 1/2 = 0,5 = 50%.',
          'Persen artinya per seratus. 75% berarti 75/100. Untuk mengubah pecahan ke persen, buat penyebutnya 100.',
          'Untuk mengubah ke desimal, bagi pembilang dengan penyebut. 1/4 berarti 1 : 4 = 0,25.',
        ],
        everyday: 'Diskon 25% di toko berarti harga turun 25 dari setiap 100 bagian, sama dengan 1/4 dari harga.',
        example: {
          question: 'Ubahlah 3/4 menjadi desimal dan persen.',
          steps: ['Ubah penyebut menjadi 100: 3/4 = 75/100.', 'Maka 75/100 = 75%.', 'Desimal: 75/100 = 0,75.'],
          answer: '0,75 dan 75%',
        },
        summary: ['1/2 = 0,5 = 50%.', 'Persen berarti per seratus.', 'Desimal didapat dengan membagi pembilang dengan penyebut.'],
      },
    ],
  },
  {
    id: 'mat5-2', grade: 5, subject: 'matematika', number: 2,
    title: 'KPK dan FPB',
    description: 'Mencari kelipatan persekutuan terkecil dan faktor persekutuan terbesar.',
    subtopics: [
      {
        id: 'mat5-2-a', title: 'Kelipatan dan KPK', difficulty: 'sedang', tags: ['kelipatan', 'KPK'],
        objectives: ['Menyebutkan kelipatan suatu bilangan.', 'Menentukan KPK dua bilangan dan memakainya pada soal cerita.'],
        explanation: [
          'Kelipatan adalah hasil perkalian suatu bilangan. Kelipatan 4 adalah 4, 8, 12, 16, 20, dan seterusnya.',
          'KPK (Kelipatan Persekutuan Terkecil) adalah kelipatan yang sama dari dua bilangan dan nilainya paling kecil.',
          'Kelipatan 4: 4, 8, 12, 16. Kelipatan 6: 6, 12, 18. Kelipatan yang sama pertama adalah 12, jadi KPK 4 dan 6 adalah 12.',
        ],
        everyday: 'KPK dipakai untuk soal yang berulang bersama, misalnya dua bus yang berangkat dengan jeda waktu berbeda.',
        example: {
          question: 'Bus A berangkat setiap 4 menit dan bus B setiap 6 menit. Keduanya berangkat bersama pukul 07.00. Pukul berapa mereka berangkat bersama lagi?',
          steps: ['Cari KPK dari 4 dan 6.', 'Kelipatan 4: 4, 8, 12. Kelipatan 6: 6, 12.', 'KPK = 12 menit.', 'Tambahkan 12 menit pada 07.00.'],
          answer: 'Pukul 07.12',
        },
        summary: ['KPK adalah kelipatan sama yang paling kecil.', 'Dipakai untuk kejadian yang berulang bersama.'],
      },
      {
        id: 'mat5-2-b', title: 'Faktor dan FPB', difficulty: 'sedang', tags: ['faktor', 'FPB'],
        objectives: ['Menyebutkan faktor suatu bilangan.', 'Menentukan FPB dua bilangan dan memakainya pada soal cerita.'],
        explanation: [
          'Faktor suatu bilangan adalah bilangan yang dapat membagi bilangan itu tanpa sisa. Faktor 12 adalah 1, 2, 3, 4, 6, dan 12.',
          'FPB (Faktor Persekutuan Terbesar) adalah faktor yang sama dari dua bilangan dan nilainya paling besar.',
          'Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Faktor yang sama: 1, 2, 3, 6. Terbesarnya 6, jadi FPB 12 dan 18 adalah 6.',
        ],
        everyday: 'FPB dipakai saat membagi barang sama banyak ke beberapa kelompok tanpa sisa.',
        example: {
          question: 'Ada 12 apel dan 18 jeruk. Buah dibagi ke dalam kantong dengan isi sama banyak, tanpa sisa. Paling banyak ada berapa kantong?',
          steps: ['Cari FPB dari 12 dan 18.', 'Faktor 12: 1, 2, 3, 4, 6, 12.', 'Faktor 18: 1, 2, 3, 6, 9, 18.', 'FPB = 6, jadi paling banyak 6 kantong (tiap kantong 2 apel dan 3 jeruk).'],
          answer: '6 kantong',
        },
        summary: ['FPB adalah faktor sama yang paling besar.', 'Dipakai untuk membagi sama banyak tanpa sisa.'],
      },
    ],
  },
  {
    id: 'mat5-3', grade: 5, subject: 'matematika', number: 3,
    title: 'Volume Kubus dan Balok',
    description: 'Menghitung isi atau volume bangun ruang kubus dan balok.',
    subtopics: [
      {
        id: 'mat5-3-a', title: 'Volume Kubus', difficulty: 'sedang', tags: ['volume', 'kubus', 'bangun ruang'],
        objectives: ['Menjelaskan arti volume.', 'Menghitung volume kubus.'],
        explanation: [
          'Volume adalah banyaknya ruang di dalam suatu bangun ruang. Satuannya adalah satuan kubik, misalnya cm³ atau m³.',
          'Kubus memiliki panjang, lebar, dan tinggi yang sama, yaitu panjang rusuknya.',
          'Volume kubus = rusuk × rusuk × rusuk.',
        ],
        everyday: 'Dadu atau kotak hadiah berbentuk kubus. Volume menunjukkan seberapa banyak isi yang muat di dalamnya.',
        example: {
          question: 'Sebuah kotak berbentuk kubus memiliki panjang rusuk 5 cm. Berapa volumenya?',
          steps: ['Rumus: V = rusuk × rusuk × rusuk.', '5 × 5 = 25.', '25 × 5 = 125.', 'Satuannya cm³.'],
          answer: '125 cm³',
        },
        summary: ['Volume = banyak ruang dalam bangun.', 'Kubus: V = r × r × r.', 'Satuan volume berpangkat tiga (cm³).'],
      },
      {
        id: 'mat5-3-b', title: 'Volume Balok', difficulty: 'sulit', tags: ['volume', 'balok', 'bangun ruang'],
        objectives: ['Menghitung volume balok.', 'Menyelesaikan soal cerita volume dengan satuan liter.'],
        explanation: [
          'Balok memiliki panjang, lebar, dan tinggi yang boleh berbeda.',
          'Volume balok = panjang × lebar × tinggi.',
          'Ingat: 1 liter = 1.000 cm³. Jadi volume dalam cm³ dapat diubah menjadi liter dengan dibagi 1.000.',
        ],
        everyday: 'Akuarium dan bak mandi berbentuk balok. Volumenya menunjukkan berapa liter air yang muat.',
        example: {
          question: 'Akuarium berbentuk balok berukuran panjang 50 cm, lebar 30 cm, dan tinggi 40 cm. Berapa liter air yang muat jika penuh?',
          steps: ['V = p × l × t.', '50 × 30 = 1.500.', '1.500 × 40 = 60.000 cm³.', 'Ubah ke liter: 60.000 : 1.000 = 60.'],
          answer: '60 liter',
        },
        summary: ['Balok: V = p × l × t.', '1 liter = 1.000 cm³.'],
      },
    ],
  },
];
