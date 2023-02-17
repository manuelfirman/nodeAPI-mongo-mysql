const { handleHttpError} = require("../utils/handleError");

// Recibe array con los roles permitidos
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    
    const checkRoles = roles.some((rolSingle) => 
      rolesByUser.includes(rolSingle)
    );


    if(!checkRoles){
      handleHttpError(res, "ERROR_PERMISSIONS_ROL_NOT_ACCEPTED", 403);
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
    return;
  }
}


module.exports = checkRol;