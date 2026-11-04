const router = require('express').Router();
const controller = require('../controllers/statusController');
router.get('/', controller.getStatus);
module.exports = router;
