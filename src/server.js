require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flashMiddleware = require('./middlewares/flashMiddleware');

const app = express();

// Configuración del motor de vistas (EJS, si lo usas).
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, imágenes, etc.).
app.use(express.static(path.join(__dirname, 'public')));

// Parseo de formularios URL-encoded
app.use(express.urlencoded({ extended: false }));

// method-override para soportar PUT y DELETE mediante ?_method=PUT o en hidden input
app.use(methodOverride('_method'));

// Cookies
app.use(cookieParser());

// Sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'un-secreto-muy-seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
  })
);

// Middleware para “flash” de errores: expone `res.locals.errors`
app.use(flashMiddleware);

// Middleware global para exponer al usuario logueado (si existe) en todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', require('./routes/main'));

// Finalmente arrancamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
