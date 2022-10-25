const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Mood = require("../models/Mood.model");
// const { addMonths, isValid } = require("date-fns");
// const { Mood } = require("../models/Mood.model");
const dashboardRouter = express.Router();

dashboardRouter.get("/", isLoggedIn, (req, res) => {
  // Every single mood, by the user
  Mood.find({ owner: req.user._id }).then((allMoods) => {
    res.json(allMoods);
  });
});

// dashboardRouter.get("/dashboard", isLoggedIn, (req, res) => {
//   const { _id } = req.user;
//   // Find One Goal, that has this slug: slug, and the owner has this value: _id
//   // Find One By That the req.user._id is the value for owner
//   Mood.findOne({ owner: _id }).then((possibleMood) => {
//     console.log("possibleMood:", possibleMood);
//     if (!possibleMood) {
//       return res
//         .status(YOU_SHALL_NOT_PASS_FOCKERS)
//         .json({ errorMessage: "Syntax Error" });
//     }

//     res.json(possibleMood);
//   });
// });

module.exports = dashboardRouter;
