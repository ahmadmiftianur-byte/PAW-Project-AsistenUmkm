const ReservasiModel = require('../models/reservasi.model');

/** Render halaman daftar reservasi (GET /reservasi) */
async function tampilkanReservasi(req, res) {
  const reservasiList = await ReservasiModel.getAll();
  res.render('reservasi', {
    appName: 'SahabatUMKM',
    activePage: 'reservasi',
    reservasiList,
    message: req.query.message || '',
    messageType: req.query.type || 'success',
  });
}

/** Ambil semua / filter reservasi sebagai JSON (GET /api/reservasi) */
async function getReservasi(req, res) {
  const { tanggal } = req.query;
  const data = tanggal
    ? await ReservasiModel.getByTanggal(tanggal)
    : await ReservasiModel.getAll();
  return res.json({ success: true, data });
}

/** Buat reservasi baru (POST /api/reservasi) — cek slot double booking (F-07) */
async function createReservasi(req, res) {
  const { nama_pelanggan, layanan, tanggal, jam, catatan } = req.body;

  if (!nama_pelanggan || !String(nama_pelanggan).trim()) {
    return res.status(400).json({ success: false, message: 'Nama pelanggan wajib diisi.' });
  }
  if (!tanggal) {
    return res.status(400).json({ success: false, message: 'Tanggal wajib diisi.' });
  }
  if (!jam) {
    return res.status(400).json({ success: false, message: 'Jam wajib diisi.' });
  }

  // Cek double booking sebelum menyimpan
  const slotTerpakai = await ReservasiModel.cekSlot(tanggal, jam);
  if (slotTerpakai) {
    return res.status(409).json({
      success: false,
      message: `Slot pada tanggal ${tanggal} pukul ${jam} sudah dipesan. Silakan pilih waktu lain.`,
    });
  }

  const reservasi = await ReservasiModel.create({
    nama_pelanggan: String(nama_pelanggan).trim(),
    layanan: layanan ? String(layanan).trim() : null,
    tanggal,
    jam,
    catatan: catatan ? String(catatan).trim() : null,
  });

  return res.status(201).json({
    success: true,
    message: 'Reservasi berhasil dibuat.',
    data: reservasi,
  });
}

/** Update status reservasi (PATCH /api/reservasi/:id/status) */
async function updateStatus(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, message: 'ID reservasi tidak valid.' });
  }

  const { status } = req.body;
  const statusValid = ['menunggu', 'terkonfirmasi', 'dibatalkan'];
  if (!statusValid.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status tidak valid. Pilih: menunggu, terkonfirmasi, atau dibatalkan.',
    });
  }

  const reservasi = await ReservasiModel.updateStatus(id, status);
  if (!reservasi) {
    return res.status(404).json({ success: false, message: 'Reservasi tidak ditemukan.' });
  }

  return res.json({
    success: true,
    message: 'Status reservasi berhasil diperbarui.',
    data: reservasi,
  });
}

module.exports = { tampilkanReservasi, getReservasi, createReservasi, updateStatus };
