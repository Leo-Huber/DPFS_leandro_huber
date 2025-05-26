const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const upload = multer({ dest: 'src/public/images/products' });

router.get('/products', productsController.list);
router.get('/products/create', productsController.createForm);
router.post('/products/create', upload.single('image'), productsController.create);
router.get('/products/:id', productsController.detail);
router.get('/products/:id/edit', productsController.editForm);
router.put('/products/:id', upload.single('image'), productsController.update);
router.delete('/products/:id', productsController.destroy);

module.exports = router;
