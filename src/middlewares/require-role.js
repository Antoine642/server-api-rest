const User = require("../models/User");

module.exports = function requireRoles(role) {
  return function (req, res, next) {
    if (role.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send("Forbbiden");
    }
  };
};
