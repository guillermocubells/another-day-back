const { Schema, model } = require("mongoose");
const { userCollectionName } = require("./User.model");

const activitySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: userCollectionName,
  },
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
