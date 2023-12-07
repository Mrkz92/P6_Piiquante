const express = require("express");
const router = express.Router();
const userRoute = require("./user.js");
const productRoute = require("./product.js");

router.use("/images", express.static("images"));
router.use("/api/auth", userRoute);
router.use("/api/products", productRoute);

module.exports = router;
