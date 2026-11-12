function notFound(req, res, next) {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
  }
  return res.status(404).render('404', { appName: 'SahabatUMKM' });
}

function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.stack || err.message || err);
  const status = err.status || 500;
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(status).json({ success: false, message: status === 500 ? 'Terjadi kesalahan pada server.' : err.message });
  }
  return res.status(status).send(status === 500 ? 'Terjadi kesalahan pada server.' : err.message);
}

module.exports = { notFound, errorHandler };