const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// const goHomeYoureDrunk = require("../utils/go-home-youre-drunk");

function isLoggedIn(req, res, next) {
  if (!req.headers.authorization) {
    return;
    // return goHomeYoureDrunk(res);
  }

  const [bearer, token] = req.headers.authorization.split(" ");

  if (bearer !== "Bearer") {
    return;
    // return goHomeYoureDrunk(res);
  }

  const tokenData = jwt.decode(token);

  if (!tokenData) {
    return;
    // return goHomeYoureDrunk(res);
  }

  User.findById(tokenData._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err:", err);
      return;
      //   return goHomeYoureDrunk(res, 500);
    });
}

module.exports = isLoggedIn;
