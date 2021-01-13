const express = require("express");
const router = express.Router();
const { isExistingUser, isGuest } = require("./middlewares");

router.get("/", isGuest, (req, res) => {
  res.send(`
    <div>
      <form method="POST" action="login">
        <h1>Sign in</h1>
          <div>
            <label >Email</label>
            <input required placeholder="Email" name="email" />
          </div>
          <div >
            <label>Password</label>
            <input placeholder="Password" required name="password" type="password"/>
          </div>
        <button>Submit</button>
      </form>
    </div> 
`);
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

router.post("/login", bodyParserManual, (req, res) => {
  console.log(req.alemar);
  const { email, password } = req.alemar;
  req.session.loggedIn = true;

  console.log(`email ${email} password ${password}`);

  res.redirect("/protected");
});

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

router.get("/register", (req, res) => {
  res.send("Registro");
});

router.get("/forgot", (req, res) => {
  res.send("Recuperar contrasena");
});

module.exports = router;
