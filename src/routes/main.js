const express = require('express');
const router = express.Router();

router.use('/', require('./products'));
router.use('/users', require('./users'));
router.get('/', (req, res) => res.redirect('/products'));

module.exports = router;
