const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload  = multer({ dest: 'public/images/users' });
const usersController = require('../controllers/usersController');
const { body } = require('express-validator');
const auth = require('../middlewares/authMiddleware');

const registerValidators = [
  body('firstName').notEmpty().withMessage('Nombre obligatorio').isLength({ min: 2 }),
  body('lastName').notEmpty().withMessage('Apellido obligatorio').isLength({ min: 2 }),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 8 }).withMessage('Minimo 8 caracteres')
];

router.get('/register', auth.guestOnly, usersController.registerForm);
router.post('/register', auth.guestOnly, upload.single('image'), registerValidators, usersController.register);

router.get('/login', auth.guestOnly, usersController.loginForm);
router.post('/login', auth.guestOnly, usersController.login);

router.get('/profile', auth.authOnly, usersController.profile);
router.get('/logout', usersController.logout);

module.exports = router;
