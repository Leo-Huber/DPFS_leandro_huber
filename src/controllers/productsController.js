// src/controllers/productsController.js
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// Lectura/escritura en JSON (cámbialo por Sequelize si migraste datos a BD)
const dataPath = path.join(__dirname, '../data/products.json');
function readProducts() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}
function writeProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
}

module.exports = {
  // Listar productos
  list: (req, res) => {
    const products = readProducts();
    return res.render('products/list', { title: 'Productos', products });
  },

  // Detalle de producto
  detail: (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    return res.render('products/detail', { title: product.name, product });
  },

  // Mostrar formulario de creación
  createForm: (req, res) => {
    const errors = res.locals.errors || {};
    return res.render('products/form-create', { title: 'Crear Producto', errors, old: {} });
  },

  // Crear producto (procesar POST)
  create: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.mapped();
      req.session.old = { ...req.body };
      return res.redirect('/products/create');
    }

    const products = readProducts();
    const { name, description, category, colors, price } = req.body;
    let productColors = [];
    if (colors) {
      productColors = colors.split(',').map(c => c.trim()).filter(c => c.length);
    }

    let imagePath = '/images/products/default.png';
    if (req.file) {
      imagePath = `/images/products/${req.file.filename}`;
    }

    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    products.push({
      id: newId,
      name,
      description,
      image: imagePath,
      category,
      colors: productColors,
      price: parseFloat(price)
    });
    writeProducts(products);

    return res.redirect('/products');
  },

  // Mostrar formulario de edición
  editForm: (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const errors = res.locals.errors || {};
    return res.render('products/form-edit', { title: 'Editar Producto', product, errors, old: {} });
  },

  // Actualizar producto (PUT)
  update: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.mapped();
      return res.redirect(`/products/${req.params.id}/edit`);
    }

    const products = readProducts();
    const idx = products.findIndex(p => p.id == req.params.id);
    if (idx < 0) {
      return res.status(404).send('Producto no encontrado');
    }

    const { name, description, category, colors, price } = req.body;
    let productColors = [];
    if (colors) {
      productColors = colors.split(',').map(c => c.trim()).filter(c => c.length);
    }

    let imagePath = products[idx].image;
    if (req.file) {
      imagePath = `/images/products/${req.file.filename}`;
    }

    products[idx] = {
      id: products[idx].id,
      name,
      description,
      image: imagePath,
      category,
      colors: productColors,
      price: parseFloat(price)
    };
    writeProducts(products);

    return res.redirect(`/products/${req.params.id}`);
  },

  // Borrar producto (DELETE)
  destroy: (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id != req.params.id);
    writeProducts(products);
    return res.redirect('/products');
  }
};
