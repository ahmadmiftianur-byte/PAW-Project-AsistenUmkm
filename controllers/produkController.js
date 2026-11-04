const produkModel = require('../models/produkModel');
function getProduk(req, res) {
  // Response langsung berupa array JSON sesuai instruksi Week 7.
  res.json(produkModel.getAllProduk());
}
module.exports = { getProduk };
