const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbname = "socialDb";
const userName = "alem_social";
const password = "DJKX3MaltuxYYYyn";
const MONGO_URI = `mongodb+srv://${userName}:${password}@cluster0.ll51q.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const firebase = require("firebase");
//const firebaseui = require("firebaseui");

const auth = require("./routes/auth");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["ddfdfrfrf"],
  })
);

app.use(flash());

app.use(auth);

//***Mongo
// mongoose.connect(MONGO_URI, {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection
//   .once("open", () => {
//     console.log("sucess mongoose");
//     //done();
//   })
//   .on("error", (error) => console.warn("Warning", error));

//***Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyCU5HUy_lBrNbTGL0Mpbm9py-5qrb8PU",
  authDomain: "social-alemar95.firebaseapp.com",
  databaseURL: "https://social-alemar95-default-rtdb.firebaseio.com/",
  projectId: "social-alemar95",
  storageBucket: "social-alemar95.appspot.com",
  messagingSenderId: "1072738244794",
  appId: "1:1072738244794:web:12669a19d8c2310206ca83",
  measurementId: "G-L4SZ6FHG5T",
};

firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
//const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Get a reference to the database service
const database = firebase.database();

const usersRef = database.ref("users");

usersRef.on("value", (snach) => {
  console.log(snach.val());
});

app.listen(3000, () => {
  console.log("localhost 3000");
});

//Como manejar el cambio de db (cuando estoy trabajando con mongo o firebase).
// el inicio de sesion en las redes solo sirve cuando la db es firebase?
//Para habilitar los metodos de inicio de sesion https://firebase.google.com/docs/auth/android/firebaseui?hl=es
