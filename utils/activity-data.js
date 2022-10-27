const FAMILY = "Family";
const FRIENDS = "Friends";
const FOOD = "Food";
const RELATIONSHIPS = "Relationships";
const HEALTH = "Health";
const EXERCISE = "Exercise";
const SPIRITUALITY = "Spirituality";
const MOVIES = "Movies";
const READING = "Reading";
const GAMING = "Gaming";
const SHOPPING = "Shopping";
const TRAVEL = "Travel";
const WORK = "Work";
const SLEEP = "Sleep";
const STUDIES = "Studies";
const FINANCES = "Finances";

const ACTIVITIES = [
  FAMILY,
  FRIENDS,
  FOOD,
  RELATIONSHIPS,
  HEALTH,
  EXERCISE,
  SPIRITUALITY,
  MOVIES,
  READING,
  GAMING,
  SHOPPING,
  TRAVEL,
  WORK,
  SLEEP,
  STUDIES,
  FINANCES,
];

const ACTIVITIES_FOR_DATABASE = [
  { title: FAMILY, custom: false },
  { title: FRIENDS, custom: false },
  { title: FOOD, custom: false },
  { title: RELATIONSHIPS, custom: false },
  { title: HEALTH, custom: false },
  { title: EXERCISE, custom: false },
  { title: SPIRITUALITY, custom: false },
  { title: MOVIES, custom: false },
  { title: READING, custom: false },
  { title: GAMING, custom: false },
  { title: SHOPPING, custom: false },
  { title: TRAVEL, custom: false },
  { title: WORK, custom: false },
  { title: SLEEP, custom: false },
  { title: STUDIES, custom: false },
  { title: FINANCES, custom: false },
];

module.exports = { ACTIVITIES, ACTIVITIES_FOR_DATABASE };
