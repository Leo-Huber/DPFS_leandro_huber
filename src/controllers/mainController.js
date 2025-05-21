const path = require('path');

module.exports = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  },
  productDetail: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'productDetail.html'));
  },
  cart: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'productCart.html'));
  },
  register: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
  }
};
