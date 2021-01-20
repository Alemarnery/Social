const express = require("express");
const router = express.Router();
const { isExistingUser, isGuest, handleErrors } = require("./middlewares");

const loginTemplate = require("../views/auth/Login");
const registerTemplate = require("../views/auth/register");
const forgotTemplate = require("../views/auth/forgot");

const User = require("../database/model/user");

const {
  requireEmail,
  requirePassword,
  requireName,
  requireDate,
} = require("./validators");

router.get("/login", isGuest, (req, res) => {
  res.send(loginTemplate({}));
});

router.post(
  "/login",
  [requireEmail, requirePassword],
  handleErrors(loginTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send("email or password arent correct!");
    }

    req.session.loggedIn = true;
    req.session.id = user._id;

    console.log(
      `id is: ${user._id},
      email is: ${email},
      password is: ${password}`
    );
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
  async (req, res) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).send("User already exist!");
    }

    new User(req.body).save();
    res.send(`User has been successfully created!!`);
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
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    userExist ? res.send("User exist!!!") : res.send("email doesn't exist");
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
