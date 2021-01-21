const express = require("express");
const router = express.Router();
const {
  isExistingUser,
  isGuest,
  handleErrors,
  userLogin,
} = require("./middlewares");

const loginTemplate = require("../views/auth/Login");
const registerTemplate = require("../views/auth/register");
const forgotTemplate = require("../views/auth/forgot");

const User = require("../database/model/user");

const { createUser } = require("../actions/authQueries");

const {
  requireEmail,
  requirePassword,
  requireName,
  requireDate,
  emailExist,
  forgotEmail,
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
    res.redirect("/protected");
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
    const newUser = await createUser(req.body);

    req.session.loggedIn = true;
    req.session.id = newUser._id;

    res.redirect("/protected");
  }
);

router.get("/forgot", isGuest, (req, res) => {
  res.send(forgotTemplate({}));
});

router.post(
  "/forgot",
  [requireEmail, forgotEmail],
  handleErrors(forgotTemplate),
  async (req, res) => {
    res.send("User exist!!!");
  }
);

//Adentro de la App
router.get("/logout", isExistingUser, (req, res) => {
  req.session.loggedIn = null;
  req.session.id = null;
  res.redirect("/login");
});

router.get("/protected", isExistingUser, (req, res) => {
  res.send(`
          <div>
               <h3>RUTA PROTEGIDA</h3>
               <h5> The userId is: ${req.session.id}</h5>
               <a href='/logout'>Logout</a>
          </div>         
          `);
});

module.exports = router;
