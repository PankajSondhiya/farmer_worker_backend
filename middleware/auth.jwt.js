const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../config/auth.config");
const { USERTYPES, USERTYPE } = require("../contants");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send({
      message: "no access token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: "Access token is invalid",
      });
      return;
    }
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    req._id = decoded._id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.userId) {
    let token = req.headers["x-access-token"];

    if (!token) {
      res.status(401).send({
        message: "No access token provided",
      });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Access token is invalid",
        });
        return;
      }

      req.userId = decoded.userId;
      req.userType = decoded.userType;
    });
  }

  if (req.userId && req.userType && req.userType === USERTYPE.ADMIN) {
    return next();
  } else if (req.userType !== USERTYPES.ADMIN) {
    res.status(403).send({
      message: "USER is not an admin",
    });
  }
};

module.exports = { isAdmin, verifyToken };
