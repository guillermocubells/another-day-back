const { Schema, model } = require("mongoose");
const {
  MOOD_STATUS_ENUM,
  MOOD_SUBSTATUS_AWFUL,
  MOOD_SUBSTATUS_BAD,
  MOOD_SUBSTATUS_OKAY,
  MOOD_SUBSTATUS_GOOD,
  MOOD_SUBSTATUS_GREAT,
} = require("../utils/mood-enum-data");

const moodSchema = new Schema(
  {
    status: {
      type: String,
      enum: MOOD_STATUS_ENUM,
      required: true,
    },
    substatus: {
      awful: {
        enum: MOOD_SUBSTATUS_AWFUL,
      },
      bad: {
        enum: MOOD_SUBSTATUS_BAD,
      },
      okay: {
        enum: MOOD_SUBSTATUS_OKAY,
      },
      good: {
        enum: MOOD_SUBSTATUS_GOOD,
      },
      great: {
        enum: MOOD_SUBSTATUS_GREAT,
      },
    },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Mood = model("Mood", moodSchema);

module.exports = Mood;
