const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const profileRouter = express.Router();

const User = require("../models/User.model");

profileRouter.use(isLoggedIn);

// Get Profile
profileRouter.get("/", (req, res) => {
  const { user } = req;

  //prevent password being send on response
  const { password, ...userWithoutPassword } = user._doc;

  res.json({ userWithoutPassword });
});

// Edit Profile
profileRouter.post("/edit", (req, res) => {});

// Delete Profile
profileRouter.get("/delete", (req, res) => {});

module.exports = profileRouter;
