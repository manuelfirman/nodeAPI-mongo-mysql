const { userModel } = require("../models");
const {handleHttpError} = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const propertiesKey = require("../utils/handleDBEngineProperties");

const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
      handleHttpError(res, "NOT_JSON_WEB_TOKEN", 401)
      return;
    }

    const token = req.headers.authorization.split(" ").pop(); // omitir palabra Bearer
    const dataToken = await verifyToken(token);

    if(!dataToken){
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id]
    }

    const user = await userModel.findOne(query);
    req.user = user; // <- inyecto el usuario a la peticion para poder usarlo en el controlador

    next();

  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401)
  }
}

module.exports = authMiddleware;