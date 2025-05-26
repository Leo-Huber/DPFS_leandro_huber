const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

function readProducts() {
  const json = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(json);
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
    const products = readProducts();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const { name, description, category, colors, price } = req.body;
    const image = req.file ? `/images/products/${req.file.filename}` : '/images/products/default.png';
    products.push({ id: newId, name, description, category, colors: colors.split(','), price: parseFloat(price), image });
    writeProducts(products);
    res.redirect('/products');
  },
  editForm: (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id == req.params.id);
    res.render('products/form-edit', { title: 'Editar Producto', product });
  },
  update: (req, res) => {
    const products = readProducts();
    const idx = products.findIndex(p => p.id == req.params.id);
    if (idx >= 0) {
      const { name, description, category, colors, price } = req.body;
      const image = req.file ? `/images/products/${req.file.filename}` : products[idx].image;
      products[idx] = { id: products[idx].id, name, description, category, colors: colors.split(','), price: parseFloat(price), image };
      writeProducts(products);
    }
    res.redirect(`/products/${req.params.id}`);
  },
  destroy: (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id != req.params.id);
    writeProducts(products);
    res.redirect('/products');
  }
};
