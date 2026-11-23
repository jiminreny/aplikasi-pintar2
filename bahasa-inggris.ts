import type { Chapter } from '../types';

export const BAHASA_INGGRIS: Chapter[] = [
  {
    id: 'be4-1', grade: 4, subject: 'bahasa-inggris', number: 1,
    title: 'About Me (Tentang Aku)',
    description: 'Menyapa, memperkenalkan diri, dan menyebut anggota keluarga.',
    subtopics: [
      {
        id: 'be4-1-a', title: 'Greetings and Introducing Myself', difficulty: 'mudah', tags: ['greetings', 'introduction', 'salam'],
        objectives: ['Mengucapkan salam sesuai waktu.', 'Memperkenalkan diri dengan kalimat sederhana.'],
        explanation: [
          'Salam dalam bahasa Inggris: Good morning (selamat pagi), Good afternoon (selamat siang/sore), Good evening (selamat malam), Good night (selamat tidur/malam saat berpisah).',
          'Untuk memperkenalkan diri: "Hello, my name is Rani. I am nine years old. I live in Jember."',
          'Untuk bertanya kabar: "How are you?" (Apa kabar?). Jawab: "I am fine, thank you." (Saya baik, terima kasih).',
        ],
        everyday: 'Saat bertemu guru tamu atau teman baru, kamu bisa menyapa dan memperkenalkan diri dalam bahasa Inggris.',
        example: {
          question: 'Apa jawaban yang tepat untuk "How are you?"',
          steps: ['"How are you?" artinya "Apa kabar?".', 'Jawaban sopan: "I am fine, thank you."'],
          answer: 'I am fine, thank you. (Saya baik, terima kasih.)',
        },
        summary: ['Good morning = selamat pagi.', 'My name is ... = Nama saya ...', 'How are you? - I am fine, thank you.'],
      },
      {
        id: 'be4-1-b', title: 'Family Members', difficulty: 'mudah', tags: ['family', 'keluarga', 'vocabulary'],
        objectives: ['Menyebutkan anggota keluarga dalam bahasa Inggris.', 'Memperkenalkan anggota keluarga dengan "This is my ...".'],
        explanation: [
          'father = ayah, mother = ibu, brother = saudara laki-laki, sister = saudara perempuan.',
          'grandfather = kakek, grandmother = nenek, uncle = paman, aunt = bibi.',
          'Untuk memperkenalkan: "This is my mother." (Ini ibuku.) atau "These are my parents." (Ini orang tuaku.)',
        ],
        everyday: 'Saat menunjukkan foto keluarga kepada teman, kamu bisa berkata "This is my father. He is a teacher."',
        example: {
          question: 'Terjemahkan: "Ini kakekku."',
          steps: ['Kakek = grandfather.', 'Ini = This is.', 'Milikku = my.'],
          answer: 'This is my grandfather.',
        },
        summary: ['father, mother, brother, sister.', 'This is my + anggota keluarga.'],
      },
    ],
  },
  {
    id: 'be4-2', grade: 4, subject: 'bahasa-inggris', number: 2,
    title: 'Things Around Me (Benda di Sekitarku)',
    description: 'Menyebut benda di kelas dan angka 1–100.',
    subtopics: [
      {
        id: 'be4-2-a', title: 'Classroom Objects', difficulty: 'mudah', tags: ['classroom', 'objects', 'this', 'that'],
        objectives: ['Menyebutkan nama benda di kelas.', 'Memakai This is / That is untuk menunjuk benda.'],
        explanation: [
          'book = buku, pencil = pensil, pen = pulpen, ruler = penggaris, eraser = penghapus, bag = tas, table = meja, chair = kursi.',
          '"This is" untuk benda yang dekat. "That is" untuk benda yang jauh.',
          'Untuk bertanya: "What is this?" Jawab: "It is a book." Gunakan "an" sebelum huruf vokal, misalnya "an eraser".',
        ],
        everyday: 'Saat mengambil penggaris dari meja temanmu, kamu bisa bertanya: "Is this your ruler?"',
        example: {
          question: 'Lengkapi: "This is ___ eraser." (a / an)',
          steps: ['Eraser diawali huruf vokal "e".', 'Sebelum huruf vokal kita memakai "an".'],
          answer: 'an',
        },
        summary: ['This is = ini (dekat), That is = itu (jauh).', 'a + konsonan, an + vokal.'],
      },
      {
        id: 'be4-2-b', title: 'Numbers 1–100', difficulty: 'mudah', tags: ['numbers', 'angka', 'counting'],
        objectives: ['Menyebut angka 1–100 dalam bahasa Inggris.', 'Menggunakan angka untuk menyebut jumlah benda.'],
        explanation: [
          'one (1), two (2), three (3), four (4), five (5), six (6), seven (7), eight (8), nine (9), ten (10).',
          'Puluhan: twenty (20), thirty (30), forty (40), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90), one hundred (100).',
          'Gabungan: twenty-one (21), thirty-five (35), forty-eight (48). Tulis dengan tanda hubung.',
        ],
        everyday: 'Saat menghitung jumlah teman di kelas, kamu bisa berkata "There are thirty students in my class."',
        example: {
          question: 'Tulis angka 45 dalam bahasa Inggris.',
          steps: ['40 = forty.', '5 = five.', 'Gabungkan dengan tanda hubung.'],
          answer: 'forty-five',
        },
        summary: ['ten, twenty, thirty ... one hundred.', 'Angka gabungan memakai tanda hubung: forty-five.'],
      },
    ],
  },
  {
    id: 'be5-1', grade: 5, subject: 'bahasa-inggris', number: 1,
    title: 'Daily Activities (Kegiatan Sehari-hari)',
    description: 'Menceritakan kegiatan sehari-hari dan menyebut waktu.',
    subtopics: [
      {
        id: 'be5-1-a', title: 'Daily Routines', difficulty: 'sedang', tags: ['daily routine', 'simple present', 'activities'],
        objectives: ['Menyebutkan kegiatan sehari-hari.', 'Menyusun kalimat kegiatan rutin sederhana.'],
        explanation: [
          'wake up = bangun, take a bath = mandi, have breakfast = sarapan, go to school = pergi ke sekolah, study = belajar, sleep = tidur.',
          'Untuk kegiatan rutin kita memakai simple present: "I wake up at six."',
          'Untuk He / She / It, kata kerja ditambah -s atau -es: "She wakes up at six." "He goes to school."',
        ],
        everyday: 'Kamu bisa menceritakan harimu kepada teman: "I have breakfast at seven. I go to school by bicycle."',
        example: {
          question: 'Lengkapi: "My brother ___ to school every day." (go / goes)',
          steps: ['"My brother" sama dengan "he".', 'Untuk he/she/it, kata kerja memakai -es.'],
          answer: 'goes',
        },
        summary: ['I/You/We/They + kata kerja dasar.', 'He/She/It + kata kerja + s/es.'],
      },
      {
        id: 'be5-1-b', title: 'Telling Time', difficulty: 'sedang', tags: ['time', 'jam', "o'clock"],
        objectives: ['Menyebut jam tepat dalam bahasa Inggris.', 'Bertanya dan menjawab tentang waktu.'],
        explanation: [
          'Untuk bertanya jam: "What time is it?" Jawab: "It is seven o\'clock." (Pukul tujuh tepat.)',
          'Setengah: "half past seven" (pukul 07.30). Seperempat lewat: "a quarter past seven" (07.15). Kurang seperempat: "a quarter to eight" (07.45).',
          'Untuk menyebut waktu kegiatan, pakai "at": "I go to school at seven o\'clock."',
        ],
        everyday: 'Kamu bisa menjelaskan jam pelajaran favoritmu: "Math class starts at eight o\'clock."',
        example: {
          question: 'Bagaimana menyebut pukul 07.30 dalam bahasa Inggris?',
          steps: ['Setengah jam setelah jam tujuh.', '"half past" + angka jam.'],
          answer: 'It is half past seven.',
        },
        summary: ["o'clock = jam tepat.", 'half past = lewat 30 menit.', 'a quarter past / a quarter to = lewat/kurang 15 menit.'],
      },
    ],
  },
  {
    id: 'be5-2', grade: 5, subject: 'bahasa-inggris', number: 2,
    title: 'Food and Places (Makanan dan Tempat)',
    description: 'Menyatakan makanan kesukaan dan menyebut tempat di kota.',
    subtopics: [
      {
        id: 'be5-2-a', title: 'Food and Drinks', difficulty: 'mudah', tags: ['food', 'drinks', 'like'],
        objectives: ['Menyebutkan nama makanan dan minuman.', "Menyatakan suka dan tidak suka dengan I like / I don't like."],
        explanation: [
          'rice = nasi, chicken = ayam, fish = ikan, egg = telur, bread = roti, milk = susu, water = air, juice = jus.',
          '"I like fried rice." (Aku suka nasi goreng.) "I don\'t like spicy food." (Aku tidak suka makanan pedas.)',
          'Untuk bertanya: "Do you like fish?" Jawab: "Yes, I do." atau "No, I don\'t."',
        ],
        everyday: 'Saat memesan makanan di kantin, kamu bisa berkata "I would like fried rice and orange juice, please."',
        example: {
          question: 'Jawab pertanyaan ini dengan "Ya": "Do you like milk?"',
          steps: ['Pertanyaan memakai "Do you...?".', 'Jawaban singkat "Ya": "Yes, I do."'],
          answer: 'Yes, I do.',
        },
        summary: ["I like ... / I don't like ...", 'Do you like ...? Yes, I do. / No, I don\'t.'],
      },
      {
        id: 'be5-2-b', title: 'Places in Town', difficulty: 'sedang', tags: ['places', 'there is', 'there are'],
        objectives: ['Menyebutkan tempat umum di kota.', 'Memakai There is dan There are.'],
        explanation: [
          'school = sekolah, market = pasar, hospital = rumah sakit, library = perpustakaan, mosque = masjid, park = taman, post office = kantor pos.',
          '"There is" untuk satu benda: "There is a park near my house."',
          '"There are" untuk banyak benda: "There are two markets in my town."',
        ],
        everyday: 'Kamu bisa menjelaskan lingkungan rumahmu kepada teman: "There is a library next to my school."',
        example: {
          question: 'Lengkapi: "___ three books on the table." (There is / There are)',
          steps: ['"three books" lebih dari satu.', 'Pakai "There are".'],
          answer: 'There are',
        },
        summary: ['There is + satu benda.', 'There are + banyak benda.'],
      },
    ],
  },
];
