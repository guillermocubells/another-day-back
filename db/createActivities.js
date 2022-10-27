const Activity = require("../models/Activity.model");
const { ACTIVITIES_FOR_DATABASE } = require("../utils/activity-data");

Activity.find({ ACTIVITIES_FOR_DATABASE }).then((possibleActivities) => {
  const activitiesToCreate = ACTIVITIES_FOR_DATABASE.filter((item) => {
    return !possibleActivities.some((e) => {
      return e.title === item.title;
    });
  });

  if (!activitiesToCreate.length) {
    return;
  }

  Activity.insertMany(activitiesToCreate)
    .then((inserted) => {
      console.log(inserted);
    })
    .catch((error) => {
      console.error(error);
    });
});
