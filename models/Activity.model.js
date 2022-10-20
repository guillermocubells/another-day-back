const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
