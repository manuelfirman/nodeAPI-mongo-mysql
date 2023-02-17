const validateResults = require("../utils/handleValidator");
const { Request } = require("express");
const { check } = require("express-validator");

const validateGetItem = [
  check("id")
    .exists()
    .notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const validateInsertItem = [
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

const validateUpdateItem = [
  check("name")
    .optional()
    .isString()
    .isLength({min: 4, max: 100}),
  check("age")
    .notEmpty()
    .isNumeric(),
  check("email")
    .optional()
    .isEmail(),
  check("password")
    .optional()
    .isString()
    .isLength({min: 8, max: 100}),
  check("role")
    .optional(),
    (req, res, next) => {
      return validateResults(req, res, next);
    }
];

module.exports = {
  validateGetItem,
  validateInsertItem,
  validateUpdateItem
}