const express = require("express");
const router = express.Router();
const userRoute = require("./user.js");
const sauceRoute = require("./sauce.js");
const likeRoute = require("./like.js");

router.use("/images", express.static("images"));
router.use("/api/auth", userRoute);
router.use("/api/sauces", sauceRoute);
// router.use("/api/sauces", likeRoute);

module.exports = router;
