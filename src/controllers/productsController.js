const { Product } = require("../database/models");
const { validationResult } = require("express-validator");

// Listar productos
exports.list = async (req, res) => {
  const products = await Product.findAll();
  return res.render('products/list', { title: 'Productos', products });
};

// Detalle de producto
exports.detail = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Producto no encontrado');
  return res.render('products/detail', { title: product.name, product });
};

// Mostrar formulario de creación
exports.createForm = (req, res) => {
  const errors = res.locals.errors || {};
  return res.render('products/form-create', { title: 'Crear Producto', errors, old: {} });
};

// Crear producto (procesar POST)
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped();
    req.session.old = { ...req.body };
    return res.redirect('/products/create');
  }
  let imagePath = '/images/products/default.jpg';
  if (req.file) {
    imagePath = `/images/products/${req.file.filename}`;
  }
  await Product.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: imagePath,
    price: parseFloat(req.body.price)
  });
  return res.redirect('/products');
};

// Mostrar formulario de edición
exports.editForm = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Producto no encontrado');
  const errors = res.locals.errors || {};
  return res.render('products/form-edit', { title: 'Editar Producto', product, errors, old: {} });
};

// Actualizar producto (PUT)
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped();
    return res.redirect(`/products/${req.params.id}/edit`);
  }
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Producto no encontrado');
  let imagePath = product.image;
  if (req.file) {
    imagePath = `/images/products/${req.file.filename}`;
  }
  await product.update({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: imagePath,
    price: parseFloat(req.body.price)
  });
  return res.redirect(`/products/${req.params.id}`);
};

// Borrar producto (DELETE)
exports.destroy = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) await product.destroy();
  return res.redirect('/products');
};
