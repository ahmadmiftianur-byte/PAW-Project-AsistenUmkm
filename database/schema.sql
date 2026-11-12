-- Jalankan file ini pada database PostgreSQL yang sudah dibuat.
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

-- Data contoh hanya dimasukkan jika tabel masih kosong.
INSERT INTO produk (nama, kategori, harga, stok, deskripsi)
SELECT data.nama, data.kategori, data.harga, data.stok, data.deskripsi
FROM (VALUES
  ('Kopi Susu Gula Aren', 'Minuman', 18000, 25, 'Kopi susu creamy dengan gula aren.'),
  ('Pisang Cokelat', 'Makanan', 12000, 30, 'Camilan pisang dengan isian cokelat.'),
  ('Keripik Singkong', 'Camilan', 10000, 40, 'Keripik singkong gurih dan renyah.')
) AS data(nama, kategori, harga, stok, deskripsi)
WHERE NOT EXISTS (SELECT 1 FROM produk);
