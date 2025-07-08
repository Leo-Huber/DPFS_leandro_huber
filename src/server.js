require('dotenv').config();
const express        = require('express');
const path           = require('path');
const methodOverride = require('method-override');
const session        = require('express-session');
const cookieParser   = require('cookie-parser');
const flashMiddleware= require('./middlewares/flashMiddleware');
const { sequelize }  = require('./database/models');

const app = express();

// STATIC FILES
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// MIDDLEWARES BASICOS
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION 
app.use(session({
  secret: 'green_harvest_super_secret',
  resave: false,
  saveUninitialized: false
}));

// FLASH
app.use(flashMiddleware);

// DISPONIBILIDAD 
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.session.user || null;
  next();
});

// VIEWS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// RUTAS
app.use('/', require('./routes/main'));
app.use('/cart', require('./routes/cart'));
app.use('/api/products', require('./routes/api/productsApi'));
app.use('/api/users', require('./routes/api/usersApi'));

// SEQUELIZE SYNC
const PORT = process.env.PORT || 3000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Sequelize: Tablas sincronizadas correctamente');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error sync DB:', err));

  module.exports = app;