const db = require('../config/database');

const ReservasiModel = {
  /** Ambil semua reservasi, diurutkan berdasarkan tanggal & jam */
  async getAll() {
    const { rows } = await db.query(
      `SELECT id, nama_pelanggan, layanan, tanggal, jam, catatan, status, created_at
       FROM reservasi ORDER BY tanggal ASC, jam ASC`
    );
    return rows;
  },

  /** Ambil reservasi berdasarkan tanggal tertentu */
  async getByTanggal(tanggal) {
    const { rows } = await db.query(
      `SELECT id, nama_pelanggan, layanan, tanggal, jam, catatan, status
       FROM reservasi WHERE tanggal = $1 ORDER BY jam ASC`,
      [tanggal]
    );
    return rows;
  },

  /**
   * Cek apakah slot sudah dipesan (pencegahan double booking — F-07)
   * @returns {boolean} true jika slot sudah terpakai
   */
  async cekSlot(tanggal, jam) {
    const { rows } = await db.query(
      'SELECT id FROM reservasi WHERE tanggal = $1 AND jam = $2',
      [tanggal, jam]
    );
    return rows.length > 0;
  },

  /** Buat reservasi baru */
  async create({ nama_pelanggan, layanan, tanggal, jam, catatan }) {
    const query = `
      INSERT INTO reservasi (nama_pelanggan, layanan, tanggal, jam, catatan)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nama_pelanggan, layanan, tanggal, jam, catatan, status, created_at
    `;
    const { rows } = await db.query(query, [
      nama_pelanggan,
      layanan || null,
      tanggal,
      jam,
      catatan || null,
    ]);
    return rows[0];
  },

  /** Update status reservasi (menunggu / terkonfirmasi / dibatalkan) */
  async updateStatus(id, status) {
    const { rows } = await db.query(
      `UPDATE reservasi SET status = $1 WHERE id = $2
       RETURNING id, nama_pelanggan, layanan, tanggal, jam, status`,
      [status, id]
    );
    return rows[0] || null;
  },
};

module.exports = ReservasiModel;
