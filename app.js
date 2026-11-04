const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logger dipasang sebelum routes agar semua request tercatat.

app.use('/', require('./routes/homeRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));
app.use('/api/produk', require('./routes/produkRoutes'));

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(config.port, () => console.log(`${config.appName} berjalan di http://localhost:${config.port}`));
}
module.exports = app;
