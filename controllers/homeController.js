const produkModel = require('../models/produkModel');
const formatRupiah = require('../utils/formatRupiah');

async function tampilkanHome(req, res) {
  const produk = await produkModel.getAll();
  res.render('index', {
    appName: 'SahabatUMKM',
    produk,
    formatRupiah,
    message: req.query.message || '',
    messageType: req.query.type || 'success',
  });
}

module.exports = { tampilkanHome };
