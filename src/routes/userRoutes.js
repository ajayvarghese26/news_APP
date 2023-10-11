const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../user.json");
const validator = require("../helper/validator");
const { addUser, updatePrefernce } = require("../helper/service");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/authJWT");
userRoutes.use(bodyParser.urlencoded({ extended: false }));
userRoutes.use(bodyParser.json());

//To register a new user
userRoutes.post("/register", async (req, res) => {
  let userDetails = req.body;
  let validatorResult = validator.userValidator(userDetails, Users);
  if (validatorResult.status) {
    try {
      let userd = await addUser(userDetails);
      res.status(200).send({ Status: "User registered Successfully" });
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send(validatorResult.message);
  }
});

//To login a user
userRoutes.post("/login", (req, res) => {
  let userList = Users.Users;
  let result = userList.filter((val) => val.email === req.body.email);
  try {
    if (result.length !== 0) {
      const isMatch = bcrypt.compareSync(req.body.password, result[0].password);
      if (isMatch) {
        var token = jwt.sign(
          {
            id: result[0].email,
          },
          process.env.API_SECRET,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).send({
          user: {
            email: result[0].email,
            preferences: result[0].preferences,
          },
          message: "Login Successsful!!",
          token: token,
        });
      } else {
        res.status(401).send("Password is incorrect");
      }
    } else {
      res.status(404).send("User not found!!");
    }
  } catch (e) {
    console.log("error", e);
  }
});

//To get the user preference
userRoutes.get("/preferences", verifyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    res.status(200);
    res.send(req.user.preferences);
  }
});

//To update a user Preference
userRoutes.post("/preferences", verifyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    newPreference = req.body.preferences;
    if (!newPreference) {
      res.status(400);
      res.send("Please provide preference");
    } else if(!(validator.validatePreferences(newPreference))){
      res.status(400);
      res.send("Please provide valid preferences");
    } else {
      let userList = Users;
      let updatedUserList = [];
      if (userList.Users && userList.Users.length > 0) {
        for (let item of userList.Users) {
          if (item.email === req.user.email) {
            item.preferences = newPreference;
          }
          updatedUserList.push(item);
        }
      }
      userList.Users = updatedUserList;
      let result = updatePrefernce(userList);
      res.status(200);
      res.send("Updated User preference");
    }
  }
});

module.exports = { userRoutes };
