const { check } = require("express-validator");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email"),

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
