// src/routes/products.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const productsController = require('../controllers/productsController');

// Configuración de multer (subida de imágenes)
const upload = multer({ dest: 'src/public/images/products' });

// Validaciones back‐end para creación/edición de productos
const productValidators = [
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0')
];

// Listado de productos
router.get('/products', productsController.list);

// Formulario de creación
router.get('/products/create', productsController.createForm);

// Crear producto (POST)
router.post(
  '/products/create',
  upload.single('image'),
  productValidators,
  productsController.create
);

// Detalle de producto
router.get('/products/:id', productsController.detail);

// Formulario de edición
router.get('/products/:id/edit', productsController.editForm);

// Actualizar producto (PUT)
router.put(
  '/products/:id',
  upload.single('image'),
  productValidators,
  productsController.update
);

// Borrar producto (DELETE)
router.delete('/products/:id', productsController.destroy);

module.exports = router;
