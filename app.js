const express = require("express");
require("express-async-errors");
const jwt = require("./managers/jwt.js");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute.js");
const sauceRoute = require("./models/sauce.js");

const { MONGO_DB } = require("./managers/db.js");
const db = MONGO_DB;

const app = express();

app.use(morgan("dev", { immediate: true }));
app.use(morgan("dev", { immediate: false }));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;
