const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { BAD_REQUEST, UNAUTHORIZED } = require("../utils/status-codes");

function isLoggedIn(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(UNAUTHORIZED).json({ errorMessage: "Why you do dis" });
  }

  const [bearer, token] = req.headers.authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(UNAUTHORIZED).json({ errorMessage: "Why you do dis" });
  }

  const tokenData = jwt.decode(token);

  if (!tokenData) {
    return res.status(UNAUTHORIZED).json({ errorMessage: "Why you do dis" });
  }

  User.findById(tokenData._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err:", err);
      return res.status(500).json({ errorMessage: "Why you do dis" });
    });
}

module.exports = isLoggedIn;
