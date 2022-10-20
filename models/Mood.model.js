const { Schema, model } = require("mongoose");

const moodSchema = new Schema(
  {
    status: {
      type: String,
      required: ["Awful", "Bad", "Okay", "Good", "Great"],
      properties: {
        Awful: {
          enum: [
            "Stressed",
            "Lonely",
            "Annoyed",
            "Dissapointed",
            "Anxious",
            "Sad",
            "Hurt",
            "Angry",
          ],
        },
        Bad: {
          enum: [
            "Bored",
            "Stressed",
            "Annoyed",
            "Anxious",
            "Tired",
            "Lonely",
            "Dissapointed",
            "Sad",
          ],
        },
        Okay: {
          enum: [
            "Hopeful",
            "Content",
            "Distracted",
            "Tired",
            "Calm",
            "Confused",
            "Bored",
            "Stressed",
          ],
        },
        Good: {
          enum: [
            "Happy",
            "Grateful",
            "Relaxed",
            "Calm",
            "Excited",
            "Confident",
            "Hopeful",
            "Content",
          ],
        },
        Great: {
          enum: [
            "Blessed",
            "Happy",
            "Grateful",
            "Relaxed",
            "Inspired",
            "Excited",
            "Confident",
            "Hopeful",
          ],
        },
      },
    },
    activity: {
      type: String,
      enum: [
        "Family",
        "Friends",
        "Food",
        "Relationships",
        "Healthy",
        "Exercise",
        "Spirituality",
        "Movies",
        "Reading",
        "Gaming",
        "Shopping",
        "Travel",
        "Work",
        "Sleep",
        "Studies",
        "Finances",
      ],
      required: true,
    },
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
