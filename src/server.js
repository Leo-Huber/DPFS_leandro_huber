require('dotenv').config();
const express        = require('express');
const path           = require('path');
const methodOverride = require('method-override');
const session        = require('express-session');
const cookieParser   = require('cookie-parser');
const flashMiddleware= require('./middlewares/flashMiddleware');
const { sequelize }  = require('./database/models');

const app = express();

// Middlewares para archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'green_harvest_super_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Otros middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(flashMiddleware);

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// User disponible en las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.session = req.session;
  next();
});

// Rutas
app.use('/', require('./routes/main'));
app.use('/cart', require('./routes/cart'));

// DB y Servidor
const PORT = process.env.PORT || 3000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Sequelize: Tablas sincronizadas correctamente');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error sync DB:', err));
