const middlewares = {
  isExistingUser: function (req, res, next) {
    if (!req.session.loggedIn) {
      return res.redirect("/");
    }
    next();
  },

  isGuest: function (req, res, next) {
    if (req.session.loggedIn) {
      return res.redirect("/protected");
    }

    next();
  },
};

module.exports = middlewares;
