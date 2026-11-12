const router = require('express').Router();
const controller = require('../controllers/produkController');

router.get('/', controller.getProduk);
router.get('/:id', controller.getProdukById);
router.post('/', controller.createProduk);
router.put('/:id', controller.updateProduk);
router.delete('/:id', controller.deleteProduk);

module.exports = router;
