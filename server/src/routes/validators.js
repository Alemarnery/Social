const { check } = require("express-validator");
const { findUserByEmail } = require("../actions/authQueries");

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
      const userExist = await findUserByEmail(email);
      if (userExist) {
        throw new Error("Email already in use");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 caracters")
    .matches("[A-Z]")
    .withMessage("Password must contain an Uppercase Letter"),

  requireName: check("name")
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty"),

  requireDate: check("birthDay")
    .isISO8601()
    .toDate()
    .withMessage("Date must not be empty")
    .custom((date) => {
      let todayDate = new Date();
      if (date > todayDate) {
        throw new Error("Invalid date of Birth");
      }
      return true;
    }),
};
