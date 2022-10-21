const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const moodRouter = express.Router();

const Mood = require("../models/Mood.model");
const { ALL_GOOD, CREATED } = require("../utils/status-codes");

moodRouter.use(isLoggedIn);

// view mood
moodRouter.get("/:id", (req, res) => {
  const { user } = req;
  const { id } = req.params;

  Mood.findOne({ id, owner: user._id })
    .then((possibleMood) => {
      res.status(ALL_GOOD).json(possibleMood);
    })
    .catch();
});

// create mood
moodRouter.post("/create", (req, res) => {
  //   get the user
  const { user } = req;

  // get values from frontend
  const { status, properties, activity, description, date, image } = req.body;

  //   do some validation on the form
  if (!status) {
    return res.json();
  }

  //   create new mood
  Mood.create({
    status,
    properties,
    activity,
    description,
    image,
    date,
    owner: user._id,
  })
    .then((createdMood) => {
      console.log(createdMood);
      res.status(CREATED).json(createdMood);
    })
    .catch();
});

module.exports = moodRouter;
