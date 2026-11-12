const db = require('../config/database');

const ProdukModel = {
  async getAll() {
    const { rows } = await db.query('SELECT id, nama, kategori, harga, stok, deskripsi, created_at, updated_at FROM produk ORDER BY id ASC');
    return rows;
  },

  async getById(id) {
    const { rows } = await db.query(
      'SELECT id, nama, kategori, harga, stok, deskripsi, created_at, updated_at FROM produk WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async create({ nama, kategori, harga, stok, deskripsi }) {
    const query = `
      INSERT INTO produk (nama, kategori, harga, stok, deskripsi)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nama, kategori, harga, stok, deskripsi, created_at, updated_at
    `;
    const values = [nama, kategori, harga, stok, deskripsi || null];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async update(id, { nama, kategori, harga, stok, deskripsi }) {
    const query = `
      UPDATE produk
      SET nama = $1, kategori = $2, harga = $3, stok = $4,
          deskripsi = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING id, nama, kategori, harga, stok, deskripsi, created_at, updated_at
    `;
    const values = [nama, kategori, harga, stok, deskripsi || null, id];
    const { rows } = await db.query(query, values);
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await db.query(
      'DELETE FROM produk WHERE id = $1 RETURNING id, nama, kategori, harga, stok, deskripsi',
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = ProdukModel;
