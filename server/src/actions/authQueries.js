const User = require("../database/model/user");
const firebase = require("firebase");

async function createUser(userData) {
  /**Mongooo*/

  // try {
  //   const user = await new User(userData).save();
  //   return user;
  // } catch (err) {
  //   return err;
  // }

  const { email, password } = userData;

  /**Firebase*/
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      const { uid } = user;

      firebase
        .database()
        .ref("users/" + uid)
        .set(userData);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return `errorMessage: ${errorMessage} errorCode: ${errorCode}`;
    });
}

async function findUserByEmailAndPassword(data) {
  const { email, password } = data;
  /**Mongooo*/
  //const user = await User.findOne({ email, password });
  //return user._id;

  /**Firebase*/
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      return error;
    });

  return user;
}

async function findUserByEmail(email) {
  const userExist = await User.findOne({ email });
  return userExist;
}

//Colocar aqui el de find
module.exports = { createUser, findUserByEmailAndPassword, findUserByEmail };
