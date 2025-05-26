const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataPath = path.join(__dirname, '../data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf-8');
}

module.exports = {
  registerForm: (req, res) => res.render('users/register', { title: 'Registro' }),
  register: async (req, res) => {
    const users = readUsers();
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const { name: firstName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const image = req.file ? `/images/users/${req.file.filename}` : '/images/users/default.png';
    users.push({ id: newId, firstName, lastName: '', email, password: hashed, category: 'cliente', image });
    writeUsers(users);
    res.redirect('/users/login');
  },
  loginForm: (req, res) => res.render('users/login', { title: 'Login' }),
  login: async (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // Simplicidad: no implementamos sesión real aún
      res.redirect('/products');
    } else {
      res.redirect('/users/login');
    }
  }
};
