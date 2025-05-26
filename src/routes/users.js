const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const upload = multer({ dest: 'src/public/images/users' });

router.get('/users/register', usersController.registerForm);
router.post('/users/register', upload.single('avatar'), usersController.register);
router.get('/users/login', usersController.loginForm);
router.post('/users/login', usersController.login);

module.exports = router;
