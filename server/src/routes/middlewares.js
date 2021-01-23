const { validationResult } = require("express-validator");
const User = require("../database/model/user");
const loginTemplate = require("../views/auth/Login");
const flash = require("connect-flash");

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

  userLogin: async function (req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      req.session.loggedIn = true;
      req.session.id = user._id;
    } else {
      req.flash("error", "email or password is not correct!");
      return res.send(loginTemplate({ dbError: req.flash("error") }));
    }
    next();
  },

  isExistingUser: function (req, res, next) {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
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
