const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const dataPath = path.join(__dirname, '../data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf-8');
}

module.exports = {
  registerForm: (req, res) => {
    res.render('users/register', { title: 'Registro' });
  },

  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Guardamos los errores en sesión y redirigimos para mostrarlos
      req.session.errors = errors.mapped();
      return res.redirect('/users/register');
    }

    const users = readUsers();
    const { firstName, lastName, email, password } = req.body;
    const exists = users.find(u => u.email === email);
    if (exists) {
      req.session.errors = { email: { msg: 'Email ya registrado' } };
      return res.redirect('/users/register');
    }

    const hashed = await bcrypt.hash(password, 10);
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const image = req.file ? `/images/users/${req.file.filename}` : '/images/users/default.png';

    users.push({ id: newId, firstName, lastName, email, password: hashed, category: 'cliente', image });
    writeUsers(users);
    res.redirect('/users/login');
  },

  loginForm: (req, res) => {
    res.render('users/login', { title: 'Login' });
  },

  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.mapped();
      return res.redirect('/users/login');
    }

    const users = readUsers();
    const { email, password, remember } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.session.errors = { credentials: { msg: 'Credenciales inválidas' } };
      return res.redirect('/users/login');
    }

    // Sesión
    req.session.user = { id: user.id, firstName: user.firstName, email: user.email };
    if (remember) {
      res.cookie('rememberEmail', email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
    }
    res.redirect('/users/profile');
  },

  logout: (req, res) => {
    res.clearCookie('rememberEmail');
    req.session.destroy(err => {
      res.redirect('/users/login');
    });
  },

  profile: (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id == req.session.user.id);
    res.render('users/profile', { title: 'Perfil', user });
  }
};
