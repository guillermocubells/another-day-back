const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const profileRouter = express.Router();

const User = require("../models/User.model");

profileRouter.use(isLoggedIn);

// Get Profile
profileRouter.get("/", (req, res) => {
  const { user } = req;
  const { password, ...userWithoutPassword } = user._doc;
  res.json({ userWithoutPassword });
});

// Edit Profile
profileRouter.get("/edit", (req, res) => {});
profileRouter.post("/edit", (req, res) => {});

// Delete Profile
profileRouter.get("/delete", (req, res) => {});

module.exports = profileRouter;
