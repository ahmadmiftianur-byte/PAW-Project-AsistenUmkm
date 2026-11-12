function getStatus(req, res) {
  res.json({
    success: true,
    app: 'SahabatUMKM',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
}
module.exports = { getStatus };
