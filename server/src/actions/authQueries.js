const User = require("../database/model/user");

async function createUser(userData) {
  try {
    const user = await new User(userData).save();
    return user;
  } catch (err) {
    return err;
  }
}

module.exports = { createUser };
