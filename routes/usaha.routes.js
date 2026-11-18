const router = require('express').Router();
const usahaController = require('../controllers/usaha.controller');

// Halaman pengaturan pemilik (GET /pengaturan)
router.get('/pengaturan', usahaController.tampilkanPengaturan);

// API: ambil data usaha sebagai JSON — dipakai sidebar chat (GET /api/usaha)
router.get('/api/usaha', usahaController.getUsaha);

// API: update data usaha (PUT /api/usaha)
router.put('/api/usaha', usahaController.updateUsaha);

module.exports = router;
