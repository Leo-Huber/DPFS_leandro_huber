module.exports = (req, res, next) => {
  // Exponer errores de validación (si existen)
  res.locals.errors = req.session.errors || {};
  delete req.session.errors;

  // Exponer datos “old” (si existen) para repoblar el formulario
  res.locals.old = req.session.old || {};
  delete req.session.old;

  next();
};
