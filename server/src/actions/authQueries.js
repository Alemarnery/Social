const User = require("../database/model/user");

async function createUser(userData) {
  try {
    const user = await new User(userData).save();
    return user;
  } catch (err) {
    return err;
  }
}

async function findUserByEmailAndPassword(data) {
  const { email, password } = data;
  const user = await User.findOne({ email, password });
  return user;
}

async function findUserByEmail(email) {
  const userExist = await User.findOne({ email });
  return userExist;
}

//Colocar aqui el de find
module.exports = { createUser, findUserByEmailAndPassword, findUserByEmail };
