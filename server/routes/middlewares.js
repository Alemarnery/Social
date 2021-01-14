const { validationResult } = require("express-validator");

const middlewares = {
  handleErrors(templateFunc) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }

      next();
    };
  },

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
