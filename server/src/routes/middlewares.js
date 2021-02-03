const { validationResult } = require("express-validator");
const loginTemplate = require("../views/auth/Login");
const { findUserByEmailAndPassword } = require("../actions/authQueries");

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
    const user = await findUserByEmailAndPassword(req.body);
    console.log(`desde middlewares ${user} `);
    if (user) {
      req.session.loggedIn = true;
      req.session.id = user._id;
    } else {
      req.flash(
        "error",
        " There was a problem loggin in. Check your email and password or create an account!"
      );
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
