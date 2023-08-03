const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const { statusMW } = require("./managers/httpstatus.js");

const app = express();

app.use(require("./middlewares/cors.js"));
app.use(morgan("dev", { immediate: true }));
app.use(morgan("dev", { immediate: false }));
app.use(express.json());
app.use(require("./routes/index.js"));
app.use(statusMW);

module.exports = app;
