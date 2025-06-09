module.exports = {
  guestOnly: (req, res, next) => {
    if (req.session.user) return res.redirect('/users/profile');
    next();
  },
  authOnly: (req, res, next) => {
    if (!req.session.user) return res.redirect('/users/login');
    next();
  }
};
