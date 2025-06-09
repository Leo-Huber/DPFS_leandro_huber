// src/routes/api/productsApi.js
const express = require('express');
const router = express.Router();

// Para JSON:
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../data/products.json');

// Si migraste a Sequelize:
const { Product, Color } = require('../../database/models');

function readProducts() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

// → GET /api/products  → lista de productos
router.get('/', async (req, res) => {
  try {
    // Opción A: JSON
    // const products = readProducts();
    // const countByCategory = products.reduce((acc, p) => {
    //   acc[p.category] = (acc[p.category] || 0) + 1;
    //   return acc;
    // }, {});
    // const response = {
    //   count: products.length,
    //   countByCategory,
    //   products: products.map(p => ({
    //     id: p.id,
    //     name: p.name,
    //     description: p.description,
    //     category: p.category,
    //     image: p.image,
    //     detail: `/api/products/${p.id}`
    //   }))
    // };
    // return res.json(response);

    // Opción B: Sequelize
    const allProducts = await Product.findAll({
      include: [{ model: Color, as: 'Colors', attributes: ['name'] }],
      order: [['createdAt', 'DESC']]
    });
    const countByCategory = {};
    allProducts.forEach(p => {
      countByCategory[p.category] = (countByCategory[p.category] || 0) + 1;
    });
    const response = {
      count: allProducts.length,
      countByCategory,
      products: allProducts.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category: p.category,
        image: p.image,
        colors: p.Colors.map(c => c.name),
        detail: `/api/products/${p.id}`
      }))
    };
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al listar productos' });
  }
});

// → GET /api/products/:id  → detalle de un producto
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Opción A: JSON
    // const products = readProducts();
    // const product = products.find(p => p.id == id);
    // if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    // return res.json(product);

    // Opción B: Sequelize
    const product = await Product.findByPk(id, {
      include: [{ model: Color, as: 'Colors', attributes: ['name'] }]
    });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    return res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      colors: product.Colors.map(c => c.name)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al obtener producto' });
  }
});

module.exports = router;
