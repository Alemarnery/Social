const firebase = require("firebase");

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("Hola User!");
    })
    .catch((error) => {
      console.log(`Error ${error}  `);
    });
}

module.exports = {
  googleLogin,
};
