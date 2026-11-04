function notFound(req, res, next) {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
  }
  return res.status(404).render('404', { appName: 'SahabatUMKM' });
}
function errorHandler(err, req, res, next) {
  console.error('Server error:', err.message);
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(err.status || 500).json({ success: false, message: 'Terjadi kesalahan pada server' });
  }
  return res.status(err.status || 500).send('Terjadi kesalahan pada server.');
}
module.exports = { notFound, errorHandler };
