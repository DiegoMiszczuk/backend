import isAdminUtils from "../utils/isAdmin.utils.js";

function isAdmin(req, res, next) {
  try {
    isAdminUtils(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isAdmin;
