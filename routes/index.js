const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute.js");
const sauceRoute = require("./sauceRoute.js");

router.use("/api/auth", userRoute);
router.use("/api/sauces", sauceRoute);

module.exports = router;
