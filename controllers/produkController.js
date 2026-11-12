const produkModel = require('../models/produkModel');

function validasiId(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
}

function validasiProduk(body) {
  const nama = String(body.nama || '').trim();
  const kategori = String(body.kategori || '').trim();
  const harga = Number(body.harga);
  const stok = Number(body.stok);
  const deskripsi = String(body.deskripsi || '').trim();
  const errors = [];

  if (!nama) errors.push('Nama produk wajib diisi.');
  if (nama.length > 150) errors.push('Nama produk maksimal 150 karakter.');
  if (!kategori) errors.push('Kategori wajib diisi.');
  if (!Number.isFinite(harga) || harga <= 0) errors.push('Harga harus berupa angka lebih dari 0.');
  if (!Number.isInteger(stok) || stok < 0) errors.push('Stok harus berupa bilangan bulat minimal 0.');

  return { errors, data: { nama, kategori, harga, stok, deskripsi } };
}

async function getProduk(req, res) {
  const produk = await produkModel.getAll();
  res.json({ success: true, message: 'Data produk berhasil diambil.', data: produk });
}

async function getProdukById(req, res) {
  if (!validasiId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'ID produk harus berupa bilangan bulat positif.' });
  }
  const produk = await produkModel.getById(Number(req.params.id));
  if (!produk) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
  return res.json({ success: true, data: produk });
}

async function createProduk(req, res) {
  const { errors, data } = validasiProduk(req.body);
  if (errors.length) return res.status(400).json({ success: false, message: 'Validasi gagal.', errors });
  const produk = await produkModel.create(data);
  return res.status(201).json({ success: true, message: 'Produk berhasil ditambahkan.', data: produk });
}

async function updateProduk(req, res) {
  if (!validasiId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'ID produk harus berupa bilangan bulat positif.' });
  }
  const { errors, data } = validasiProduk(req.body);
  if (errors.length) return res.status(400).json({ success: false, message: 'Validasi gagal.', errors });
  const produk = await produkModel.update(Number(req.params.id), data);
  if (!produk) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
  return res.json({ success: true, message: 'Produk berhasil diperbarui.', data: produk });
}

async function deleteProduk(req, res) {
  if (!validasiId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'ID produk harus berupa bilangan bulat positif.' });
  }
  const produk = await produkModel.delete(Number(req.params.id));
  if (!produk) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
  return res.json({ success: true, message: 'Produk berhasil dihapus.', data: produk });
}

module.exports = { getProduk, getProdukById, createProduk, updateProduk, deleteProduk };
