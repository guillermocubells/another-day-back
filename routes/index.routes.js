const express = require("express");
const router = express.Router();
const dashboardRouter = require("./dashboard.routes");

const { ACTIVITIES } = require("../utils/activity-data");
const { MOOD_STATUS_ENUM, MOOD_SUBSTATUS } = require("../utils/mood-enum-data");

router.get("/", (req, res, next) => {
  res.json({
    activities: ACTIVITIES,
    mood_status: MOOD_STATUS_ENUM,
    mood_substatus: MOOD_SUBSTATUS,
  });
});

router.use("/dashboard", dashboardRouter);

module.exports = router;
