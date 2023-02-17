const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { userModel } = require("../models");
const { encrypt, verifyHash } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");


// Loguea una usuario comparando el JWT
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req) // curar la data
    const user = await userModel.findOne({email: req.email}).select("password email"); // <- traemos solo la password del user (oculta como undefined)
    if(!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const plainPass = req.password;
    const hashPass = user.get("password"); // <- obtenemos la password encriptada
    const check = await verifyHash(plainPass, hashPass);
    if(!check){
      handleHttpError(res, "INVALID_PASSWORD", 401);
      return;
    }

    user.set("password", undefined, { strict: false }) // <- volvemos a "ocultar" la password
    const data = {
      token: tokenSign(user),
      user: user,
    }

    res.send({data});

  } catch (e) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};


// Registra un usuario, hashea la password y genera un JWT
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER_USER");
    console.log(e.message);
    return;
  }
};

module.exports = {
  loginCtrl,
  registerCtrl,
};
