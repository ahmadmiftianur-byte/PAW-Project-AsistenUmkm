# SahabatUMKM — PPAW Week 7

Fondasi aplikasi web SahabatUMKM untuk praktikum integrasi frontend, REST API, dan middleware logger. Pada Week 7, fokus implementasi adalah dashboard sederhana, API status, API produk, dan logger. Fitur chatbot merupakan rencana pengembangan minggu berikutnya, bukan syarat endpoint Week 7.

## Teknologi
- Node.js dan Express.js
- EJS sebagai view engine
- Bootstrap 5 CDN
- Pola Model-View-Controller (MVC)

## Menjalankan aplikasi
1. Pastikan Node.js dan npm sudah terpasang.
2. Buka folder project di terminal.
3. Jalankan `npm install`.
4. Jalankan `npm start`.
5. Buka `http://localhost:3000`.

## Endpoint
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/status` | Status server dalam JSON |
| GET | `/api/produk` | Array data produk dalam JSON |

Data produk contoh disimpan pada `models/produkModel.js`. Halaman EJS menerima data produk dari `homeController`, bukan mengambil data statis sendiri.

## Pengujian
- Buka `http://localhost:3000` untuk melihat dashboard.
- Buka `http://localhost:3000/api/status` untuk menguji status.
- Buka `http://localhost:3000/api/produk` untuk menguji array produk.
- Buka `http://localhost:3000/api/tidak-ada` untuk menguji response 404.
- Perhatikan terminal. Logger menampilkan timestamp, method, path, dan status HTTP setiap request selesai.

## Struktur folder
- `config/`: konfigurasi port dan nama aplikasi.
- `models/`: sumber data produk.
- `middlewares/`: logger dan penanganan error/404.
- `controllers/`: logika halaman dan API.
- `routes/`: pemetaan URL ke controller.
- `views/`: template EJS.
- `utils/`: fungsi format harga Rupiah.
- `public/`: file CSS statis.
- `app.js`: entry point Express.




# SahabatUMKM — PPAW Week 8
# SahabatUMKM

**Sistem Manajemen Produk UMKM Berbasis Web**

SahabatUMKM merupakan aplikasi berbasis web yang membantu pelaku UMKM mengelola data produk secara digital. Aplikasi ini dikembangkan menggunakan Node.js, Express.js, EJS, Bootstrap, dan PostgreSQL.

## Teknologi yang Digunakan

- Node.js
- Express.js
- PostgreSQL
- EJS
- Bootstrap
- JavaScript
- HTML dan CSS

## Fitur Aplikasi

- Menampilkan dashboard produk UMKM.
- Menampilkan daftar produk.
- Menambahkan produk baru.
- Mengubah informasi produk.
- Menghapus produk.
- Mengambil data produk melalui REST API.
- Menampilkan status server melalui endpoint `/api/status`.
- Mencatat aktivitas HTTP menggunakan middleware logger.

## Struktur Project

```text
SahabatUMKM-Week7-Final/
├── config/
│   ├── appConfig.js
│   └── database.js
├── controllers/
│   ├── homeController.js
│   ├── produkController.js
│   └── statusController.js
├── middlewares/
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   └── produkModel.js
├── routes/
│   ├── homeRoutes.js
│   ├── produkRoutes.js
│   └── statusRoutes.js
├── views/
├── public/
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Persyaratan Instalasi

Pastikan perangkat sudah memiliki:

- Node.js dan npm
- PostgreSQL
- Git

## Cara Menjalankan Project

1. Clone repository:

```bash
git clone URL_REPOSITORY_GITHUB
```

2. Masuk ke folder project:

```bash
cd SahabatUMKM-Week7-Final
```

3. Instal dependencies:

```bash
npm install
```

4. Buat file `.env` berdasarkan `.env.example`, kemudian isi konfigurasi PostgreSQL sesuai perangkat masing-masing.

5. Pastikan database `sahabatumkm` dan tabel `produk` sudah tersedia.

6. Jalankan aplikasi:

```bash
npm start
```

7. Buka browser:

```text
http://localhost:3000
```

## REST API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/produk` | Menampilkan semua produk |
| GET | `/api/produk/:id` | Menampilkan produk berdasarkan ID |
| POST | `/api/produk` | Menambahkan produk |
| PUT | `/api/produk/:id` | Mengubah produk |
| DELETE | `/api/produk/:id` | Menghapus produk |
| GET | `/api/status` | Memeriksa status server |

## Database

Aplikasi menggunakan PostgreSQL untuk menyimpan data produk UMKM.

Tabel utama yang digunakan adalah `produk`, yang menyimpan informasi produk seperti nama, kategori, harga, stok, deskripsi, serta waktu pembuatan dan pembaruan data.

## Arsitektur

Project menggunakan pola **Model-View-Controller (MVC)**:

- **Model:** Mengelola komunikasi dan query database.
- **View:** Menampilkan antarmuka aplikasi menggunakan EJS.
- **Controller:** Mengatur proses dan logika aplikasi.
- **Routes:** Mengatur alamat endpoint aplikasi.
- **Middleware:** Menangani logging dan error.

## Pengembang

Project ini dibuat untuk memenuhi tugas praktikum Pemrograman Aplikasi Web (PPAW).

**Project:** SahabatUMKM  
**Topik:** Integrasi Database dan Implementasi CRUD  
**Database:** PostgreSQL

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5db4e8c9-2a54-491e-b449-219419700ce5" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/454ac540-d90c-4c90-aff3-699b3fc23bcd" />
<img width="1442" height="587" alt="image" src="https://github.com/user-attachments/assets/e47afed1-8247-4589-a9af-22967a9b6078" />


pengujian:
get:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2dee3ea9-8dbe-4ef1-a21b-becb7bbab447" />

post:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/45c331da-6111-4853-98d1-c7a2ffa8a4c1" />

delete:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fd8550a8-4ea7-4c32-bc1b-1f7f4263fc86" />
