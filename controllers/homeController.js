const produkModel = require('../models/produkModel');
const UsahaModel = require('../models/usaha.model');
const formatRupiah = require('../utils/formatRupiah');

async function tampilkanHome(req, res) {
  const [produk, usaha] = await Promise.all([
    produkModel.getAll(),
    UsahaModel.getUsaha(),
  ]);

  res.render('index', {
    appName: 'SahabatUMKM',
    activePage: 'home',
    produk,
    usaha,
    formatRupiah,
    message: req.query.message || '',
    messageType: req.query.type || 'success',
  });
}

module.exports = { tampilkanHome };

