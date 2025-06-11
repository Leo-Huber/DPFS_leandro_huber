const bcrypt = require('bcryptjs');
const { User } = require('../database/models');
const { validationResult } = require('express-validator');

exports.registerForm = (req, res) => {
  res.render('users/register', { errors: [], old: {} });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('users/register', { errors: errors.array(), old: req.body });
  }
  const hashed = bcrypt.hashSync(req.body.password, 10);
  await User.create({
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    email:     req.body.email,
    password:  hashed,
    category: 'cliente',
    image:    req.file ? `/images/users/${req.file.filename}` : null
  });
  res.redirect('/users/login');
};

exports.loginForm = (req, res) => {
  res.render('users/login', { errors: [], old: {} });
};

exports.login = async (req, res) => {
  const { email, password, remember } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('users/login', {
      errors: [{ msg: 'Credenciales inválidas' }],
      old: { email }
    });
  }
  req.session.user = { id: user.id, firstName: user.firstName };
  if (remember) res.cookie('userId', user.id, { maxAge: 2592000000 });
  res.redirect('/users/profile');
};

exports.profile = async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  res.render('users/profile', { user });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('userId');
    res.redirect('/');
  });
};