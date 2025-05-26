const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/main');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRoutes);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
