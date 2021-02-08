const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const {
  isExistingUser,
  isGuest,
  handleErrors,
  userLogin,
  emailExist,
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

router.get("/googleSingIn", isGuest, (req, res) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("Hola User!");
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
});

router.get("/register", isGuest, (req, res) => {
  res.send(registerTemplate({}));
});

router.post(
  "/register",
  [requireEmail, requirePassword, requireName, requireDate],
  handleErrors(registerTemplate),
  emailExist,
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
