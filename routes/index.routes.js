const express = require("express");
const router = express.Router();
const dashboardRouter = require("./dashboard.routes");

const { ACTIVITIES } = require("../utils/activity-data");
const { MOOD_STATUS_ENUM, MOOD_SUBSTATUS } = require("../utils/mood-enum-data");
const Activity = require("../models/Activity.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, async (req, res, next) => {
  const { user } = req;

  const allActivities = await Activity.find({
    $or: [{ custom: false }, { owner: user._id }],
  })
    .then((possibleActivities) => {
      return possibleActivities;
    })
    .catch((error) => {
      console.error(error);
    });

  res.json({
    activities: await allActivities,
    mood_status: MOOD_STATUS_ENUM,
    mood_substatus: MOOD_SUBSTATUS,
  });
});

router.use("/dashboard", dashboardRouter);

module.exports = router;
