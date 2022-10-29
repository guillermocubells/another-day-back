const express = require("express");
const { addMonths, isValid } = require("date-fns");
const isLoggedIn = require("../middleware/isLoggedIn");
const moodRouter = express.Router();

const Mood = require("../models/Mood.model");
const Activity = require("../models/Activity.model");

const { ALL_GOOD, CREATED, BAD_REQUEST } = require("../utils/status-codes");
const { ACTIVITIES } = require("../utils/activity-data");

moodRouter.use(isLoggedIn);

// Get all moods By current user
moodRouter.get("/get-all", (req, res) => {
  const { user } = req;

  Mood.find({ owner: user._id })
    .populate("activities")
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
    .populate("activities")
    .then((possibleMood) => {
      return res.status(ALL_GOOD).json(possibleMood);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ errorMessage: "Nothing Found. Try Again..." });
    });
});

async function createActivityIfNotProvided(activities, user) {
  if (!activities || !activities.length) {
    return undefined;
  }

  const findActivities = await Activity.find({
    $and: [
      { title: { $in: activities } },
      { $or: [{ custom: false }, { owner: user._id }] },
    ],
  });

  const newActivities = activities.filter((item) => {
    return !findActivities.some((e) => e.title === item);
  });

  // if (!newActivities.length) {
  //   return findActivities;
  // }

  const newActivitiesArray = newActivities.map((item) => {
    return { title: item.trim(), owner: user._id, custom: true };
  });

  const createdActivities = await Activity.insertMany(newActivitiesArray);

  if (!createdActivities.length) {
    return findActivities;
  }

  return [...findActivities, ...createdActivities];
}

// create mood
moodRouter.post("/create", async (req, res) => {
  const { user } = req;

  const {
    status,
    substatus,
    activities,
    journal,
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
    activities: await createActivityIfNotProvided(activities, user),
    journal,
    image,
    date: new Date(date),
    owner: user._id,
  })
    .then((createdMood) => {
      res.status(CREATED).json(createdMood);
    })
    .catch();
});

module.exports = moodRouter;
