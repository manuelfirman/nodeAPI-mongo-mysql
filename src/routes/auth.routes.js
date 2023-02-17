const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth.ctrl");
const router = express.Router();
const { validatorLogin, validatorRegister } = require("../validators/auth.valid");

router.post("/login", validatorLogin, loginCtrl);

router.post("/register", validatorRegister, registerCtrl);

module.exports = router;
