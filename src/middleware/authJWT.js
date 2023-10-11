const jwt = require("jsonwebtoken");
const userList = require("../user.json");

//To validate given token with stored secret
const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          next();
        }
        users = userList.Users;
        let result = users.filter((val) => val.email === decode.id);
        if (result.length !== 0) {
          req.user = result[0];
          next();
        } else {
          req.user = undefined;
          req.message = "No user found";
          next();
        }
      }
    );
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};

module.exports = verifyToken;
