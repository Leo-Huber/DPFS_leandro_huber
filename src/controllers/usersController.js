// src/controllers/usersController.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Ruta al archivo JSON de usuarios (si sigues usando JSON)
// Si ya migraste a Sequelize, omite esta parte y usa modelos Sequelize en su lugar.
const dataPath = path.join(__dirname, '../data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf-8');
}

module.exports = {
  // Mostrar formulario de registro
  registerForm: (req, res) => {
    const errors = res.locals.errors || {};
    res.render('users/register', { title: 'Registro', errors, old: {} });
  },

  // Procesar registro
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, los guardamos en sesión para mostrarlos
      req.session.errors = errors.mapped();
      // Además, guardamos los datos “old” para repoblar el formulario
      req.session.old = { ...req.body };
      return res.redirect('/users/register');
    }

    // Lectura de usuarios desde JSON (o consulta a Sequelize)
    const users = readUsers();
    const { firstName, lastName, email, password } = req.body;

    // Comprobar si el email ya existe
    if (users.find(u => u.email === email)) {
      req.session.errors = { email: { msg: 'Email ya registrado' } };
      req.session.old = { ...req.body };
      return res.redirect('/users/register');
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Generar ID y guardar avatar
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    let image = '/images/users/default.png';
    if (req.file) {
      image = `/images/users/${req.file.filename}`;
    }

    // Crear usuario y escribir en JSON
    users.push({
      id: newId,
      firstName,
      lastName,
      email,
      password: hashed,
      category: 'cliente',
      image
    });
    writeUsers(users);

    return res.redirect('/users/login');
  },

  // Mostrar formulario de login
  loginForm: (req, res) => {
    const errors = res.locals.errors || {};
    res.render('users/login', { title: 'Login', errors, old: {} });
  },

  // Procesar login
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.mapped();
      req.session.old = { ...req.body };
      return res.redirect('/users/login');
    }

    const users = readUsers();
    const { email, password, remember } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.session.errors = { credentials: { msg: 'Credenciales inválidas' } };
      req.session.old = { email };
      return res.redirect('/users/login');
    }

    // Guardamos en sesión los datos esenciales
    req.session.user = { id: user.id, firstName: user.firstName, email: user.email };
    if (remember) {
      res.cookie('rememberEmail', email, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 días
    }
    return res.redirect('/users/profile');
  },

  // Logout
  logout: (req, res) => {
    res.clearCookie('rememberEmail');
    req.session.destroy(err => {
      return res.redirect('/users/login');
    });
  },

  // Mostrar perfil
  profile: (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id == req.session.user.id);
    return res.render('users/profile', { title: 'Perfil', user });
  }
};
