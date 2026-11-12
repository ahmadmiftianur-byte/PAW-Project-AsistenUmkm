function logger(req, res, next) {
  const startedAt = Date.now();
  const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms`);
  });

  next();
}

module.exports = logger;
