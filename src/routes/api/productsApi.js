const express = require('express');
const router = express.Router();
const { Product } = require('../../database/models');

// Listar productos
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
    const { name, description, price, image, category } = req.body; // <-- AGREGA category
    if (!name || !description || !price) return res.status(400).json({ error: 'Faltan campos obligatorios' });
    const newProduct = await Product.create({
      name,
      description,
      price,
      image: image || '/images/products/default.jpg',
      category: category || 'Sin categoría'
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto.' });
  }
});

// Editar producto
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body; // <-- AGREGA category
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    await product.update({
      name,
      description,
      price,
      image: image || product.image,
      category: category || product.category
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto.' });
  }
});


// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    await product.destroy();
    res.json({ message: 'Producto eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
});

module.exports = router;
