const express = require('express');
const router = express.Router();
const { Product } = require('../../database/models');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto.' });
  }
});

// Crear producto
router.post('/', async (req, res) => {
  try {
    const { name, description, image, category, price } = req.body;
    const nuevo = await Product.create({ name, description, image, category, price });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto.' });
  }
});

// Editar producto
router.put('/:id', async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto.' });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    await producto.destroy();
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar producto.' });
  }
});

module.exports = router;
