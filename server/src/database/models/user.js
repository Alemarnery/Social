const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lasName: {
    type: String,
  },
  email: {
    type: String,
    //required: true,
  },
  password: {
    type: String,
    //required: true,
  },
  birthDay: {
    type: Date,
    //required: true,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
