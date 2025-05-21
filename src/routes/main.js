const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Rutas estáticas de maquetado
router.get('/', mainController.home);
router.get('/product-detail', mainController.productDetail);
router.get('/cart', mainController.cart);
router.get('/register', mainController.register);
router.get('/login', mainController.login);

module.exports = router;
