const express = require("express");
const routes = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
const PORT = 3000;
require("dotenv").config();
const { userRoutes } = require("./routes/userRoutes");
const { newsRoutes } = require("./routes/newsRoutes");

routes.get("/", (req, res) => {
  res.status(200).send("Welcome to News Application");
});

routes.use("/users", userRoutes);
routes.use("/news", newsRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server started successfuly");
  } else {
    console.log("Failure in starting server");
  }
});
