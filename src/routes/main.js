const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/products'));

router.use('/products', require('./products'));
router.use('/users', require('./users'));

module.exports = router;