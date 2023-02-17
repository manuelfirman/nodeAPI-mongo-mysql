const validateResults = require("../utils/handleValidator");
const { Request } = require("express");
const { check } = require("express-validator");

const validatorRegister = [
  check("name")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 4, max: 100}),
  check("age")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),
  check("password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 8, max: 100}),
  check("role")
    .exists()
    .notEmpty(),
    
    (req, res, next) => {
      return validateResults(req, res, next);
    }
];

const validatorLogin = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),

  check("password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 8, max: 100}),

    (req, res, next) => {
      return validateResults(req, res, next);
    }
];

module.exports = {
  validatorRegister,
  validatorLogin
}