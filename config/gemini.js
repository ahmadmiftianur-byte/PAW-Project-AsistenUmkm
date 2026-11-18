const { GoogleGenerativeAI } = require('@google/generative-ai');

// Lazy initialization — tidak crash saat startup, error muncul saat dipakai
let _genAI = null;

/**
 * Mengembalikan instance GoogleGenerativeAI.
 * Melempar error jika GEMINI_API_KEY belum dikonfigurasi.
 */
function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY belum dikonfigurasi. Tambahkan ke file .env terlebih dahulu.'
    );
  }
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return _genAI;
}

/**
 * Mengembalikan instance GenerativeModel dengan system instruction.
 * @param {string} systemInstruction - Instruksi sistem untuk membatasi peran AI
 */
function getModel(systemInstruction) {
  const genAI = getGenAI();
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    systemInstruction,
  });
}

module.exports = { getModel };
