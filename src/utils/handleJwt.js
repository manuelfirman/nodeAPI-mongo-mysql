const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handleDBEngineProperties");
const propertiesKey = getProperties();
// Firmar el token
// Recibe el objeto de usuario como @param
const tokenSign = (user) => {
  
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

// Verificar si el token fue firmado por el backend
// Recibe el token de session de JWT como @param
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = {
  tokenSign,
  verifyToken,
};
