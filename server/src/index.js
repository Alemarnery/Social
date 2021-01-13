const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const auth = require("../routes/auth");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["ddfdfrfrf"],
  })
);

app.use(auth);

app.listen(3001, () => {
  console.log("localhost 3001");
});
