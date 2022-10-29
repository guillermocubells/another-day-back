const { Schema, model } = require("mongoose");
const {
  MOOD_AWFUL,
  MOOD_BAD,
  MOOD_OKAY,
  MOOD_GOOD,
  MOOD_GREAT,
  MOOD_STATUS_ENUM,
  MOOD_SUBSTATUS,
} = require("../utils/mood-enum-data");

const moodSchema = new Schema(
  {
    status: {
      type: String,
      enum: MOOD_STATUS_ENUM,
      required: true,
    },
    substatus: {
      [MOOD_AWFUL]: {
        type: String,
        enum: MOOD_SUBSTATUS[MOOD_AWFUL],
      },
      [MOOD_BAD]: {
        type: String,
        enum: MOOD_SUBSTATUS[MOOD_BAD],
      },
      [MOOD_OKAY]: {
        type: String,
        enum: MOOD_SUBSTATUS[MOOD_OKAY],
      },
      [MOOD_GOOD]: {
        type: String,
        enum: MOOD_SUBSTATUS[MOOD_GOOD],
      },
      [MOOD_GREAT]: {
        type: String,
        enum: MOOD_SUBSTATUS[MOOD_GREAT],
      },
    },
    // activities: { type: [String] },
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
