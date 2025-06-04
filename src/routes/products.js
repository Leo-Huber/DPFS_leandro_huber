const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const productsController = require('../controllers/productsController');
const upload = multer({ dest: 'src/public/images/products' });

// Validaciones de back-end para creación/edición
const productValidators = [
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
  // `image` lo validaremos en el controlador si req.file existe
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0')
];

router.get('/products', productsController.list);
router.get('/products/create', productsController.createForm);
router.post(
  '/products/create',
  upload.single('image'),
  productValidators,
  productsController.create
);
router.get('/products/:id', productsController.detail);
router.get('/products/:id/edit', productsController.editForm);
router.put(
  '/products/:id',
  upload.single('image'),
  productValidators,
  productsController.update
);
router.delete('/products/:id', productsController.destroy);

module.exports = router;
