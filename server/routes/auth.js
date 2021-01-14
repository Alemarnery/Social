const express = require("express");
const router = express.Router();
const { isExistingUser, isGuest, handleErrors } = require("./middlewares");

const loginTemplate = require("../views/auth/Login");
const registerTemplate = require("../views/auth/register");
const forgotTemplate = require("../views/auth/forgot");

const {
  requireEmail,
  requirePassword,
  requireName,
  requireDate,
} = require("./validators");

router.get("/login", isGuest, (req, res) => {
  res.send(loginTemplate({}));
});

const bodyParserManual = (req, res, next) => {
  if (req.method === "POST") {
    req.on("data", (data) => {
      const dataTraducida = data.toString("utf8").split("&");

      const resultante = {};
      for (let pair of dataTraducida) {
        const [key, value] = pair.split("=");
        resultante[key] = value;
      }
      req.alemar = resultante;
      next();
    });
  } else {
    next();
  }
};

router.post(
  "/login",
  [requireEmail, requirePassword],
  handleErrors(loginTemplate),
  (req, res) => {
    const { email, password } = req.body;

    req.session.loggedIn = true;

    console.log(`email ${email} password ${password}`);
    res.redirect("/protected");
  }
);

router.get("/register", isGuest, (req, res) => {
  res.send(registerTemplate({}));
});

router.post(
  "/register",
  [requireEmail, requirePassword, requireName, requireDate],
  handleErrors(registerTemplate),
  (req, res) => {
    res.send(`hola`);
  }
);

router.get("/forgot", isGuest, (req, res) => {
  res.send(forgotTemplate({}));
});

router.post(
  "/forgot",
  [requireEmail],
  handleErrors(forgotTemplate),
  (req, res) => {
    res.send("Bien recovery email");
  }
);
//Adentro de la App

router.get("/logout", isExistingUser, (req, res) => {
  req.session.loggedIn = null;
  res.redirect("/");
});

router.get("/protected", isExistingUser, (req, res) => {
  res.send(`
          <div>
               <div>RUTA PROTEGIDA</div>
               <a href='/logout'>Logout</a>
          </div>         
          `);
});

module.exports = router;
