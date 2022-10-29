const express = require("express");
const { addMonths, isValid } = require("date-fns");
const isLoggedIn = require("../middleware/isLoggedIn");
const moodRouter = express.Router();

const Mood = require("../models/Mood.model");
const { ALL_GOOD, CREATED, BAD_REQUEST } = require("../utils/status-codes");

moodRouter.use(isLoggedIn);

// Get all moods By current user
moodRouter.get("/get-all", (req, res) => {
  const { user } = req;

  Mood.find({ owner: user._id })
    .then((allMoodsByUser) => {
      res.status(ALL_GOOD).json(allMoodsByUser);
    })
    .catch((error) => {
      res.status(500).json({ message: "Data not found.." });
    });
});

// view single mood
moodRouter.get("/:id", (req, res) => {
  const { user } = req;
  const { id } = req.params;

  Mood.findOne({ _id: id, owner: user._id })
    .then((possibleMood) => {
      return res.status(ALL_GOOD).json(possibleMood);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ errorMessage: "Nothing Found. Try Again..." });
    });
});

async function createActivityIfNotProvided(activities) {
  if (!activities || !activities.length) {
    return undefined;
  }
}

// create mood
moodRouter.post("/create", async (req, res) => {
  const { user } = req;

  const {
    status,
    substatus,
    activities,
    description,
    date = new Date(),
    image,
  } = req.body;

  //   do some validation on the form
  if (!status) {
    return res.status(BAD_REQUEST).json({ message: "No status provided" });
  }

  //   create new mood
  Mood.create({
    status,
    substatus: substatus && { [status]: substatus },
    activities,
    description,
    image,
    date: new Date(date),
    owner: user._id,
  })
    .then((createdMood) => {
      console.log(createdMood);
      res.status(CREATED).json(createdMood);
    })
    .catch();
});

module.exports = moodRouter;
