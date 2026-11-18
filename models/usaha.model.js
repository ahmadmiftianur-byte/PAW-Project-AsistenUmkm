const db = require('../config/database');

const UsahaModel = {
  /** Ambil data usaha aktif (satu record pertama) */
  async getUsaha() {
    const { rows } = await db.query(
      'SELECT id, nama, deskripsi, jam_buka, lokasi, gaya_bahasa, updated_at FROM usaha ORDER BY id ASC LIMIT 1'
    );
    return rows[0] || null;
  },

  /** Update data usaha (profile + gaya bahasa bot) */
  async updateUsaha({ nama, deskripsi, jam_buka, lokasi, gaya_bahasa }) {
    const query = `
      UPDATE usaha
      SET nama = $1, deskripsi = $2, jam_buka = $3, lokasi = $4,
          gaya_bahasa = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM usaha ORDER BY id ASC LIMIT 1)
      RETURNING id, nama, deskripsi, jam_buka, lokasi, gaya_bahasa, updated_at
    `;
    const { rows } = await db.query(query, [
      nama,
      deskripsi || null,
      jam_buka || null,
      lokasi || null,
      gaya_bahasa,
    ]);
    return rows[0] || null;
  },
};

module.exports = UsahaModel;
