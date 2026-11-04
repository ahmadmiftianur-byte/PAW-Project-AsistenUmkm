function getStatus(req, res) {
  res.json({ success: true, status: 'online', message: 'Server SahabatUMKM berjalan', timestamp: new Date().toISOString() });
}
module.exports = { getStatus };
