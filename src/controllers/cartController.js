const db = require('../database/models');

module.exports = {
showCart: (req, res) => {
    if (!req.session.cart) req.session.cart = [];
    const cart = req.session.cart;
    res.render('cart', { cart, title: 'Carrito | Green Harvest' });
  },

  addToCart: async (req, res) => {
    const productId = req.params.id;
    const product = await db.Product.findByPk(productId);

    if (!product) return res.redirect('/products');

    if (!req.session.cart) req.session.cart = [];
    const existing = req.session.cart.find(item => item.product.id == productId);
    if (existing) {
      existing.qty += 1;
    } else {
      req.session.cart.push({ product: product.dataValues, qty: 1 });
    }
    res.redirect('/cart');
  },

  removeFromCart: (req, res) => {
    const productId = req.params.id;
    if (req.session.cart) {
      req.session.cart = req.session.cart.filter(item => item.product.id != productId);
    }
    res.redirect('/cart');
  },

  clearCart: (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
  }
};
