// src/routes/main.js
const express = require('express');
const router = express.Router();

// Rutas web “normales”
router.use('/', require('./products'));
router.use('/users', require('./users'));

// Rutas de API (JSON)
router.use('/api/users', require('./api/usersApi'));
router.use('/api/products', require('./api/productsApi'));

// Redirigir raíz a /products
router.get('/', (req, res) => res.redirect('/products'));

module.exports = router;
