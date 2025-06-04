require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flashMiddleware = require('./middlewares/flashMiddleware');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Parseo de formularios
app.use(express.urlencoded({ extended: false }));

// method-override para PUT y DELETE
app.use(methodOverride('_method'));

// Cookie parser
app.use(cookieParser());

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'un-secreto-muy-seguro',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Flash de errores
app.use(flashMiddleware);

// Exponer usuario y errores en toda la vista
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  // res.locals.errors ya es llenado por flashMiddleware
  next();
});

// Rutas principales
app.use('/', require('./routes/main'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
