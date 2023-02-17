const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { Request } = require("express");

const validatorCreateItem = [
  check("name")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 100 }),

  check("album")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 100 }),

  check("cover")
    .exists()
    .notEmpty()
    .isString(),

  check("artist")
    .exists()
    .notEmpty(),
  check("artist.name")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 100 }),
  check("artist.nickname")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 100 }),
  check("artist.nationality")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ max: 100 }),

  check("duration")
    .exists()
    .notEmpty(),
  check("duration.start")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("duration.end")
    .exists()
    .notEmpty()
    .isNumeric(),

  check("mediaId")
    .exists()
    .notEmpty()
    .isMongoId(),

  (req, res, next) => validateResults(req, res, next)

];

const validatorUpdateItem = [
  check("name")
    .optional()
    .isString()
    .isLength({ min: 5, max: 100 }),

  check("album")
    .optional()
    .isString()
    .isLength({ min: 5, max: 100 }),

  check("cover")
    .optional()
    .isString(),

  check("artist")
    .optional(),
  check("artist.name")
    .optional()
    .isString()
    .isLength({ min: 5, max: 100 }),
  check("artist.nickname")
    .optional()
    .isLength({ min: 5, max: 100 }),
  check("artist.nationality")
    .optional()
    .isString()
    .isLength({ max: 100 }),

  check("duration")
    .optional(),
  check("duration.start")
    .optional()
    .isNumeric(),
  check("duration.end")
    .optional()
    .isNumeric(),

  check("mediaId")
    .optional()
    .isMongoId(),

  (req, res, next) => validateResults(req, res, next)

];

const validatorGetItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
      return validateResults(req, res, next)
    }
]

module.exports = {
  validatorGetItem,
  validatorCreateItem,
  validatorUpdateItem,
};
