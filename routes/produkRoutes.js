const router = require('express').Router();
const controller = require('../controllers/produkController');
router.get('/', controller.getProduk);
module.exports = router;
