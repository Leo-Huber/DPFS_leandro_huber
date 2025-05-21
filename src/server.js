const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/main');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
