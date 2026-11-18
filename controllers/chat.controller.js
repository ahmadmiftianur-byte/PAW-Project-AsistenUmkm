const geminiService = require('../service/gemini.service');
const UsahaModel = require('../models/usaha.model');
const ProdukModel = require('../models/produkModel');

/**
 * Render halaman chat (GET /chat)
 * Data usaha dimuat server-side untuk greeting awal.
 */
async function tampilkanChat(req, res) {
  const usaha = await UsahaModel.getUsaha();
  res.render('chat', {
    appName: 'SahabatUMKM',
    activePage: 'chat',
    usahaName: usaha ? usaha.nama : 'SahabatUMKM',
  });
}

/**
 * Handler utama chatbot (POST /api/chat)
 * Alur: validasi (middleware) → ambil konteks DB → kirim ke Gemini → kembalikan respons.
 * Input  : { message: string }
 * Output : { success: true, data: { reply: string } }
 */
async function chat(req, res) {
  const { message } = req.body;

  // Ambil data usaha sebagai konteks AI
  const usaha = await UsahaModel.getUsaha();
  if (!usaha) {
    return res.status(503).json({
      success: false,
      message:
        'Data usaha belum dikonfigurasi. Silakan lengkapi informasi usaha di halaman Pengaturan terlebih dahulu.',
    });
  }

  // Ambil daftar produk sebagai konteks tambahan
  const produkList = await ProdukModel.getAll();

  // Kirim ke Gemini — tangani error API secara spesifik
  try {
    const reply = await geminiService.sendMessage(message, usaha, produkList);
    return res.json({ success: true, data: { reply } });
  } catch (error) {
    console.error('[CHAT] Error dari Gemini API:', error.message);

    let userMessage =
      'Maaf, asisten AI sedang tidak tersedia. Silakan coba beberapa saat lagi.';

    if (error.message.includes('GEMINI_API_KEY')) {
      userMessage =
        'Layanan AI belum dikonfigurasi. Silakan hubungi pemilik usaha untuk mengatur API key.';
    } else if (
      error.message.includes('RESOURCE_EXHAUSTED') ||
      error.message.includes('quota') ||
      error.message.includes('limit')
    ) {
      userMessage =
        'Layanan AI sedang mencapai batas penggunaan. Silakan coba lagi beberapa saat lagi.';
    } else if (
      error.message.includes('SAFETY') ||
      error.message.includes('blocked')
    ) {
      userMessage =
        'Pesan Anda tidak dapat diproses karena melanggar kebijakan keamanan. Silakan ajukan pertanyaan lain.';
    }

    return res.status(503).json({ success: false, message: userMessage });
  }
}

module.exports = { tampilkanChat, chat };
