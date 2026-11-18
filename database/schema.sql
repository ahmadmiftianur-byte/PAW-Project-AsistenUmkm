-- Jalankan file ini pada database PostgreSQL yang sudah dibuat.

-- ===== TABEL PRODUK (sudah ada) =====
CREATE TABLE IF NOT EXISTS produk (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(150) NOT NULL,
  kategori VARCHAR(100) NOT NULL,
  harga NUMERIC(12, 2) NOT NULL CHECK (harga > 0),
  stok INTEGER NOT NULL DEFAULT 0 CHECK (stok >= 0),
  deskripsi TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produk (nama, kategori, harga, stok, deskripsi)
SELECT data.nama, data.kategori, data.harga, data.stok, data.deskripsi
FROM (VALUES
  ('Kopi Susu Gula Aren', 'Minuman', 18000, 25, 'Kopi susu creamy dengan gula aren.'),
  ('Pisang Cokelat', 'Makanan', 12000, 30, 'Camilan pisang dengan isian cokelat.'),
  ('Keripik Singkong', 'Camilan', 10000, 40, 'Keripik singkong gurih dan renyah.')
) AS data(nama, kategori, harga, stok, deskripsi)
WHERE NOT EXISTS (SELECT 1 FROM produk);

-- ===== TABEL BARU: USAHA =====
-- Menyimpan profil usaha sebagai konteks untuk AI Assistant (F-02, F-03)
CREATE TABLE IF NOT EXISTS usaha (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(150) NOT NULL,
  deskripsi TEXT,
  jam_buka VARCHAR(150),
  lokasi TEXT,
  gaya_bahasa VARCHAR(50) NOT NULL DEFAULT 'ramah',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usaha (nama, deskripsi, jam_buka, lokasi, gaya_bahasa)
SELECT
  'Warung Makan Asep',
  'Warung makan rumahan khas Sunda yang menyajikan hidangan lezat dengan bahan-bahan segar pilihan.',
  'Senin–Sabtu: 07.00–21.00 WIB, Minggu: 08.00–18.00 WIB',
  'Jl. Sukajadi No. 12, Sukajadi, Bandung, Jawa Barat',
  'ramah'
WHERE NOT EXISTS (SELECT 1 FROM usaha);

-- ===== TABEL BARU: RESERVASI =====
-- Menyimpan pemesanan/reservasi slot dari pelanggan (F-06, F-07)
CREATE TABLE IF NOT EXISTS reservasi (
  id SERIAL PRIMARY KEY,
  nama_pelanggan VARCHAR(150) NOT NULL,
  layanan VARCHAR(150),
  tanggal DATE NOT NULL,
  jam TIME NOT NULL,
  catatan TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'menunggu',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tanggal, jam)
);
