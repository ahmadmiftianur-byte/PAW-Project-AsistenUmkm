// Logger mencatat request setelah response selesai dikirim.
module.exports = function logger(req, res, next) {
  const waktuMulai = new Date();
  res.on('finish', () => {
    const timestamp = waktuMulai.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
};
