const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
      },
      message: (props) => "The specified email address is already in use.",
    },
  },
  password: {
    type: String,
    required: true,
  },
  birthDay: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
