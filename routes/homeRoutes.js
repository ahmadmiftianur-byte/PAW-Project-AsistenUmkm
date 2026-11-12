const router = require('express').Router();
const controller = require('../controllers/homeController');

router.get('/', controller.tampilkanHome);
module.exports = router;
