const router = require('express').Router();
const reservasiController = require('../controllers/reservasi.controller');

// Halaman daftar reservasi untuk pemilik (GET /reservasi)
router.get('/reservasi', reservasiController.tampilkanReservasi);

// API: ambil semua/filter reservasi (GET /api/reservasi?tanggal=YYYY-MM-DD)
router.get('/api/reservasi', reservasiController.getReservasi);

// API: buat reservasi baru — cek double booking di controller (POST /api/reservasi)
router.post('/api/reservasi', reservasiController.createReservasi);

// API: update status reservasi (PATCH /api/reservasi/:id/status)
router.patch('/api/reservasi/:id/status', reservasiController.updateStatus);

module.exports = router;
