const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { Request } = require("express");

const validateGetItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];
  
// const validateInsertItem = [
//   check("url")
//     .exists()
//     .notEmpty()
//     .isString()
//     .isLength({min: 3}),
//   check("filename")
//     .exists()
//     .notEmpty()
//     .isString()
//     .isLength({min: 3}),
//   (req, res, next) => {
//     return validateResults(req, res, next);
//   }
// ];

// const validateUpdateItem = [
//   check("url")
//     .exists()
//     .isString()
//     .isLength({min: 3}),
//   check("filename")
//     .exists()
//     .isString()
//     .isLength({min: 3}),
//   (req, res, next) => {
//     return validateResults(req, res, next);
//   }
// ]

module.exports = {
  validateGetItem,
  // validateInsertItem,
  // validateUpdateItem,
}