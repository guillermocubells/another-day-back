const MOOD_AWFUL = "Awful";
const MOOD_BAD = "Bad";
const MOOD_OKAY = "Okay";
const MOOD_GOOD = "Good";
const MOOD_GREAT = "Great";

const MOOD_STATUS_ENUM = [
  MOOD_AWFUL,
  MOOD_BAD,
  MOOD_OKAY,
  MOOD_GOOD,
  MOOD_GREAT,
];

const MOOD_SCORE = {
  [MOOD_AWFUL]: 1,
  [MOOD_BAD]: 2,
  [MOOD_OKAY]: 3,
  [MOOD_GOOD]: 4,
  [MOOD_GREAT]: 5,
};

const MOOD_SUBSTATUS = {
  [MOOD_AWFUL]: [
    "Stressed",
    "Lonely",
    "Annoyed",
    "Dissapointed",
    "Anxious",
    "Sad",
    "Hurt",
    "Angry",
  ],
  [MOOD_BAD]: [
    "Bored",
    "Stressed",
    "Annoyed",
    "Anxious",
    "Tired",
    "Lonely",
    "Dissapointed",
    "Sad",
  ],
  [MOOD_OKAY]: [
    "Hopeful",
    "Content",
    "Distracted",
    "Tired",
    "Calm",
    "Confused",
    "Bored",
    "Stressed",
  ],
  [MOOD_GOOD]: [
    "Happy",
    "Grateful",
    "Relaxed",
    "Calm",
    "Excited",
    "Confident",
    "Hopeful",
    "Content",
  ],
  [MOOD_GREAT]: [
    "Blessed",
    "Happy",
    "Grateful",
    "Relaxed",
    "Inspired",
    "Excited",
    "Confident",
    "Hopeful",
  ],
};

module.exports = {
  MOOD_AWFUL,
  MOOD_BAD,
  MOOD_OKAY,
  MOOD_GOOD,
  MOOD_GREAT,
  MOOD_STATUS_ENUM,
  MOOD_SCORE,
  MOOD_SUBSTATUS,
};
