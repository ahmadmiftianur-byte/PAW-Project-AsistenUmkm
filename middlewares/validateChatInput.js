/**
 * Middleware: validateChatInput
 * Memvalidasi input pesan chat sebelum diteruskan ke controller.
 * Menangani: pesan kosong, terlalu panjang, dan pola prompt injection.
 */

const MAX_LENGTH = 500;

// Pola prompt injection yang umum (Bahasa Inggris & Indonesia)
const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|your)\s+instructions?/i,
  /forget\s+(your|all|previous)\s+instructions?/i,
  /disregard\s+(your|all|previous)\s+instructions?/i,
  /override\s+(your|all|previous|system)\s+(instructions?|prompt)/i,
  /you\s+are\s+now\s+(a|an)/i,
  /act\s+as\s+(if\s+you\s+(are|were)|a|an)/i,
  /pretend\s+(you\s+are|to\s+be|that\s+you)/i,
  /roleplay\s+as/i,
  /jangan\s+ikuti\s+(semua\s+)?(instruksi|aturan)/i,
  /abaikan\s+(semua\s+)?(instruksi|aturan|sistem)/i,
  /lupakan\s+(semua\s+)?(instruksi|aturan|peranmu)/i,
  /berpura-?pura\s+(kamu|kau|anda)\s+(adalah|bukan|menjadi)/i,
  /ubah\s+(peranmu|identitasmu|rolemu|instruksimu)/i,
  /ganti\s+(peranmu|identitasmu|rolemu)/i,
  /kamu\s+(sekarang|mulai)\s+(adalah|bukan|menjadi)/i,
  /system\s*prompt/i,
  /system\s*instruction/i,
  /DAN\s+(prompt|instruction)/,
];

function validateChatInput(req, res, next) {
  const { message } = req.body;

  // 1. Field 'message' wajib ada
  if (message === undefined || message === null) {
    return res.status(400).json({
      success: false,
      message: 'Field "message" wajib disertakan dalam request body.',
    });
  }

  const trimmed = String(message).trim();

  // 2. Pesan tidak boleh kosong
  if (trimmed.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Pesan tidak boleh kosong.',
    });
  }

  // 3. Panjang maksimal
  if (trimmed.length > MAX_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang. Maksimal ${MAX_LENGTH} karakter (diterima: ${trimmed.length} karakter).`,
    });
  }

  // 4. Deteksi pola prompt injection
  const isInjection = INJECTION_PATTERNS.some((pattern) => pattern.test(trimmed));
  if (isInjection) {
    return res.status(400).json({
      success: false,
      message:
        'Pesan tidak dapat diproses. Silakan ajukan pertanyaan tentang produk, layanan, atau informasi usaha kami.',
    });
  }

  // Simpan versi yang sudah ditrim ke req.body
  req.body.message = trimmed;
  next();
}

module.exports = validateChatInput;
