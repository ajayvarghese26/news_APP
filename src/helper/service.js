const path = require("path");
const bcrypt = require("bcryptjs");
const userList = require("../user.json");
const fs = require("fs");

const addUser = async (user) => {
  // Add the new user
  user.password = await bcrypt.hash(user.password, 3);
  userList.Users.push(user);
  let writepath = path.join(__dirname, "..", "user.json");
  fs.writeFileSync(writepath, JSON.stringify(userList), {
    encoding: "utf-8",
    flag: "w",
  });
  return user;
};

//Update user preference
const updatePrefernce = async (user) => {
  let writepath = path.join(__dirname, "..", "user.json");
  fs.writeFileSync(writepath, JSON.stringify(user), {
    encoding: "utf-8",
    flag: "w",
  });
  return user;
};

module.exports = { addUser, updatePrefernce };
