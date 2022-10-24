const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const { Mood } = require("../models/Mood.model");
// const { addMonths, isValid } = require("date-fns");
// const { Mood } = require("../models/Mood.model");
const dashboardRouter = express.Router();

dashboardRouter.get("/", isLoggedIn, (req, res) => {
  // Every single mood, by the user
  Mood.find({ owner: req.user._id }).then((allMoods) => {
    res.json(allMoods);
  });
});

module.exports = dashboardRouter;
