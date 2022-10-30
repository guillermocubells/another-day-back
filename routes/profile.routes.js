const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const profileRouter = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const Mood = require("../models/Mood.model");
const Activity = require("../models/Activity.model");

profileRouter.use(isLoggedIn);

// Get Profile
profileRouter.get("/", (req, res) => {
  const { user } = req;
  //prevent password being send on response
  const { password, ...userWithoutPassword } = user._doc;

  res.json({ ...userWithoutPassword });
});

// Edit Profile
profileRouter.post("/edit-profile", (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  // Check if email or name are provided as empty strings
  if (email === "" || name === "") {
    res.status(400).json({ message: "Provide email and name" });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser && !foundUser._id.equals(user._id)) {
        return res.status(400).json({ message: "User already exists." });
      }

      User.findByIdAndUpdate(user._id, { name, email })
        .then((updatedUser) => {
          // Deconstruct the user object to omit the password
          const { _id, email, name } = updatedUser;

          // Create an object that will be set as the token payload
          const payload = { _id, email, name };

          // Create a JSON Web Token and sign it
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "6h",
          });

          // Send the token as the response
          res.status(200).json({ authToken: authToken });
        })
        .catch((error) => {
          res.status(500).json({ message: "User not found.." });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "User not found.." });
    });
});

// Change Password
profileRouter.post("/change-password", (req, res) => {
  const { user } = req;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (
    !passwordRegex.test(oldPassword) ||
    !passwordRegex.test(newPassword) ||
    !passwordRegex.test(confirmPassword)
  ) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  //   check if passwords are the same
  if (newPassword !== confirmPassword) {
    res.status(400).json({
      message: "Passwords are not the same...",
    });
    return;
  }

  //   check if your password is indeed your password
  //   bcrypt compare....
  User.findById(user._id)
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(
        oldPassword,
        foundUser.password
      );

      if (passwordCorrect) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(confirmPassword, salt);

        User.findByIdAndUpdate(user._id, { password: hashedPassword }).then(
          (updatedUser) => {
            console.log("updating user");

            // Deconstruct the user object to omit the password
            const { _id, email, name } = updatedUser;

            // Create an object that will be set as the token payload
            const payload = { _id, email, name };

            // Create a JSON Web Token and sign it
            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
              algorithm: "HS256",
              expiresIn: "6h",
            });

            // Send the token as the response
            res.status(200).json({ authToken: authToken });
          }
        );
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "User not found.." });
    });
});

// Delete Profile
profileRouter.post("/delete-user", (req, res) => {
  const { user } = req;
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // delete moods, delete activities, delete user
        Mood.deleteMany({ owner: user._id })
          .then((deletedItems) => {
            console.log(deletedItems);
          })
          .catch((error) => {});
        Activity.deleteMany({ owner: user._id })
          .then((deletedItems) => {
            console.log(deletedItems);
          })
          .catch((error) => {});
        User.findByIdAndDelete(user._id)
          .then((deletedUser) => {
            console.log(deletedUser);
          })
          .catch((error) => {});
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .then((allStuffDeleted) => {
      res.json({ hi: "hi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "User not found.." });
    });
});

module.exports = profileRouter;
