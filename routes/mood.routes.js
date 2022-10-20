const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const moodRouter = express.Router();

const Mood = require("../models/Mood.model");

moodRouter.use(isLoggedIn);

// view mood
moodRouter.get("/:slug", (req, res) => {
  const { user } = req;
  const { slug } = req.params;
  res.json({ hi: `${slug}` });
});

// create mood
moodRouter.post("/create", (req, res) => {
  //   get the user
  const { user } = req;
  console.log(user);

  // get values from frontend
  const { status, properties, activity, description, date, image } = req.body;

  //   do some validation on the form

  //   create new mood
});

module.exports = moodRouter;
