const UsahaModel = require('../models/usaha.model');

/** Render halaman pengaturan (GET /pengaturan) */
async function tampilkanPengaturan(req, res) {
  const usaha = await UsahaModel.getUsaha();
  res.render('pengaturan', {
    appName: 'SahabatUMKM',
    activePage: 'pengaturan',
    usaha,
    message: req.query.message || '',
    messageType: req.query.type || 'success',
  });
}

/** Ambil data usaha sebagai JSON (GET /api/usaha) — dipakai sidebar chat */
async function getUsaha(req, res) {
  const usaha = await UsahaModel.getUsaha();
  if (!usaha) {
    return res.status(404).json({
      success: false,
      message: 'Data usaha belum dikonfigurasi.',
    });
  }
  return res.json({ success: true, data: usaha });
}

/** Update data usaha (PUT /api/usaha) */
async function updateUsaha(req, res) {
  const { nama, deskripsi, jam_buka, lokasi, gaya_bahasa } = req.body;

  if (!nama || !String(nama).trim()) {
    return res.status(400).json({
      success: false,
      message: 'Nama usaha wajib diisi.',
    });
  }

  const gayaValid = ['ramah', 'santai', 'formal'];
  const gayaNorm = String(gaya_bahasa || 'ramah').toLowerCase();
  if (!gayaValid.includes(gayaNorm)) {
    return res.status(400).json({
      success: false,
      message: 'Gaya bahasa tidak valid. Pilih: ramah, santai, atau formal.',
    });
  }

  const usaha = await UsahaModel.updateUsaha({
    nama: String(nama).trim(),
    deskripsi: deskripsi ? String(deskripsi).trim() : null,
    jam_buka: jam_buka ? String(jam_buka).trim() : null,
    lokasi: lokasi ? String(lokasi).trim() : null,
    gaya_bahasa: gayaNorm,
  });

  if (!usaha) {
    return res.status(404).json({
      success: false,
      message: 'Data usaha tidak ditemukan. Pastikan skema database sudah dijalankan.',
    });
  }

  return res.json({
    success: true,
    message: 'Pengaturan usaha berhasil disimpan.',
    data: usaha,
  });
}

module.exports = { tampilkanPengaturan, getUsaha, updateUsaha };
