require('dotenv').config();

const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const db = require('./config/database');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/', require('./routes/homeRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));
app.use('/api/produk', require('./routes/produkRoutes'));

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  db.query('SELECT NOW() AS waktu')
    .then(() => {
      console.log('[DATABASE] Berhasil terhubung ke PostgreSQL.');
      app.listen(config.port, () => {
        console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
      });
    })
    .catch((error) => {
      console.error('[DATABASE] Gagal terhubung:', error.message);
      console.error('Periksa PostgreSQL, nama database, dan konfigurasi file .env.');
      process.exit(1);
    });
}

module.exports = app;
