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


