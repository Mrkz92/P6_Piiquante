const express = require("express");

const like = require("../controllers/like");
const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/:id/like", auth, like.likeSauce);

module.exports = router;
