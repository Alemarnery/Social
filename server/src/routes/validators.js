const { check } = require("express-validator");
const User = require("../database/model/user");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email"),

  emailExist: check("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("Email already in use");
      }
    }),

  forgotEmail: check("email")
    .isEmail()
    .withMessage("Mus be a valid email")
    .custom(async (email) => {
      const userExist = await User.findOne({ email });
      if (!userExist) {
        throw new Error("email doesn't exist");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 caracters"),

  requireName: check("name")
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty"),

  requireDate: check("birthDay")
    .isISO8601()
    .toDate()
    .withMessage("Name must not be empty"),
};
