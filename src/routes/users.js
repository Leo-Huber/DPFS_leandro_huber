// src/routes/users.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'src/public/images/users' });
const usersController = require('../controllers/usersController');
const { guestOnly, authOnly } = require('../middlewares/authMiddleware');

// ————————————————
// Validaciones back‐end para el registro
// ————————————————
const registerValidators = [
  body('firstName')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debes ingresar un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

// ————————————————
// Validaciones back‐end para el login
// ————————————————
const loginValidators = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debes ingresar un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

// Rutas de registro
router.get('/register', guestOnly, usersController.registerForm);
router.post(
  '/register',
  guestOnly,
  upload.single('avatar'),
  registerValidators,
  usersController.register
);

// Rutas de login
router.get('/login', guestOnly, usersController.loginForm);
router.post(
  '/login',
  guestOnly,
  loginValidators,
  usersController.login
);

// Ruta de logout
router.post('/logout', authOnly, usersController.logout);

// Ruta de perfil
router.get('/profile', authOnly, usersController.profile);

module.exports = router;
