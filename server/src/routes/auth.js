const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const {
  isExistingUser,
  isGuest,
  handleErrors,
  userLogin,
} = require("./middlewares");

const loginTemplate = require("../views/auth/Login");
const registerTemplate = require("../views/auth/register");
const forgotTemplate = require("../views/auth/forgot");

const { createUser } = require("../actions/authQueries");

const {
  requireEmail,
  requirePassword,
  requireName,
  requireDate,
  emailExist,
} = require("./validators");

router.get("/login", isGuest, (req, res) => {
  res.send(loginTemplate({}));
});

router.post(
  "/login",
  [requireEmail, requirePassword],
  handleErrors(loginTemplate),
  userLogin,
  async (req, res) => {
    res.redirect("/");
  }
);

router.get("/register", isGuest, (req, res) => {
  res.send(registerTemplate({}));
});

router.post(
  "/register",
  [requireEmail, emailExist, requirePassword, requireName, requireDate],
  handleErrors(registerTemplate),
  async (req, res) => {
    await createUser(req.body);

    res.redirect("/login");
  }
);

router.get("/forgot", isGuest, (req, res) => {
  res.send(forgotTemplate({}));
});

router.post(
  "/forgot",
  [requireEmail],
  handleErrors(forgotTemplate),
  async (req, res) => {
    req.flash(
      "successEmail",
      "You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can’t find the email"
    );
    return res.send(forgotTemplate({ email: req.flash("successEmail") }));
  }
);

//Adentro de la App
router.get("/logout", isExistingUser, (req, res) => {
  firebase.auth().signOut();
  req.session.loggedIn = null;
  req.session.id = null;
  res.redirect("/login");
});

router.get("/", isExistingUser, (req, res) => {
  res.send(`
          <div>
               <h3>RUTA PROTEGIDA</h3>
               <h5> The userId is: ${req.session.id}</h5>
               <a href='/logout'>Logout</a>
          </div>         
          `);
});

module.exports = router;
