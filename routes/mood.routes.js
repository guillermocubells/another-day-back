const express = require("express");

const moodRouter = express.Router();

// view mood
moodRouter.get("/:slug", (req, res) => {
  const { slug } = req.params;
  res.json({ hi: "hi" });
});

// create mood
moodRouter.post("/create", (req, res) => {});

module.exports = moodRouter;
