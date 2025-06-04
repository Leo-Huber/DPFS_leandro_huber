// src/middlewares/flashMiddleware.js

module.exports = (req, res, next) => {
  // Si hay errores guardados en sesión, pásalos a res.locals y luego elimínalos.
  res.locals.errors = req.session.errors || {};
  delete req.session.errors;
  next();
};
