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
router.post('/', async (req, res) => {
  try {
    let { name, description, price, image } = req.body;
    if (!name || !description || !price) return res.status(400).json({ error: 'Faltan campos obligatorios' });
    // Asignar imagen por defecto si viene vacío, null o undefined
    if (!image || image.trim() === "") image = '/images/products/default.jpg';
    const newProduct = await Product.create({ name, description, price, image });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto.' });
  }
});

// Detalle de producto
router.get('/products/:id', productsController.detail);

// Formulario de edición
router.get('/products/:id/edit', productsController.editForm);

// Actualizar producto (PUT)
router.put('/:id', async (req, res) => {
  try {
    let { name, description, price, image } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    // Mantener la imagen previa si no se envía una imagen nueva
    if (!image || image.trim() === "") image = product.image || '/images/products/default.jpg';
    await product.update({ name, description, price, image });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto.' });
  }
});

// Borrar producto (DELETE)
router.delete('/products/:id', productsController.destroy);

module.exports = router;
