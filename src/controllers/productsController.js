const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const dataPath = path.join(__dirname, '../data/products.json');

function readProducts() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}
function writeProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
}

module.exports = {
  list: (req, res) => {
    const products = readProducts();
    res.render('products/list', { title: 'Productos', products });
  },

  detail: (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id == req.params.id);
    res.render('products/detail', { title: product.name, product });
  },

  createForm: (req, res) => {
    res.render('products/form-create', { title: 'Crear Producto' });
  },

  create: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.mapped();
      return res.redirect('/products/create');
    }

    const products = readProducts();
    const { name, description, category, colors, price } = req.body;

    // Validar imagen: si no se subió, usamos default
    let imagePath;
    if (req.file) {
      imagePath = `/images/products/${req.file.filename}`;
    } else {
      productColors = colors.split(',').map(c => c.trim()).filter(c => c.length);
      imagePath = '/images/products/default.png';
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
    res.redirect('/products');
  },

  editForm: (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id == req.params.id);
    res.render('products/form-edit', { title: 'Editar Producto', product });
  },

  update: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.mapped();
      return res.redirect(`/products/${req.params.id}/edit`);
    }

    const products = readProducts();
    const idx = products.findIndex(p => p.id == req.params.id);
    if (idx < 0) return res.redirect('/products');

    const { name, description, category, colors, price } = req.body;
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
      colors: colors.split(',').map(c => c.trim()).filter(c => c.length),
      price: parseFloat(price)
    };
    writeProducts(products);
    res.redirect(`/products/${req.params.id}`);
  },

  destroy: (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id != req.params.id);
    writeProducts(products);
    res.redirect('/products');
  }
};
