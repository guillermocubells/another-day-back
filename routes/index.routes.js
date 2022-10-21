const express = require("express");
const router = express.Router();

const { ACTIVITIES } = require("../utils/activity-data");
const { MOOD_STATUS_ENUM } = require("../utils/mood-enum-data");

router.get("/", (req, res, next) => {
  res.json({ activities: ACTIVITIES, mood_status: MOOD_STATUS_ENUM });
});

module.exports = router;
