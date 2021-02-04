const { validationResult } = require("express-validator");
const loginTemplate = require("../views/auth/Login");
const { findUserByEmailAndPassword } = require("../actions/authQueries");
const firebase = require("firebase");

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
    /**Mongo**/
    // const user = await findUserByEmailAndPassword(req.body);
    // if (user) {
    //   req.session.loggedIn = true;
    //   req.session.id = user._id;
    // } else {
    //   req.flash(
    //     "error",
    //     " There was a problem loggin in. Check your email and password or create an account!"
    //   );
    //   return res.send(loginTemplate({ dbError: req.flash("error") }));
    // }

    /**Firebase**/
    await findUserByEmailAndPassword(req.body);
    const singIn = firebase.auth().currentUser;
    if (singIn) {
      req.session.loggedIn = true;
      req.session.id = singIn.uid;
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
      return res.redirect("/");
    }
    next();
  },
};

module.exports = middlewares;
