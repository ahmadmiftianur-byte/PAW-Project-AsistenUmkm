// Model menyimpan dan menyediakan data contoh produk UMKM.
const produk = [
  { id: 1, nama: 'Kopi Susu Gula Aren', kategori: 'Minuman', harga: 18000, deskripsi: 'Kopi susu creamy dengan gula aren.' },
  { id: 2, nama: 'Pisang Cokelat', kategori: 'Makanan', harga: 12000, deskripsi: 'Camilan pisang dengan isian cokelat.' },
  { id: 3, nama: 'Keripik Singkong', kategori: 'Camilan', harga: 10000, deskripsi: 'Keripik singkong gurih dan renyah.' }
];
function getAllProduk() { return produk; }
module.exports = { getAllProduk };
