const produkModel = require('../models/produkModel');
const formatRupiah = require('../utils/formatRupiah');
function tampilkanHome(req, res) {
  res.render('index', { appName: 'SahabatUMKM', produk: produkModel.getAllProduk(), formatRupiah });
}
module.exports = { tampilkanHome };
