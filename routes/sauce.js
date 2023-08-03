const express = require("express");

const sauce = require("../controllers/sauce");
const like = require("../controllers/like");
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer.js");

const router = express.Router();

router.post("/", auth, multer, sauce.createSauce);
router.get("/:id", auth, sauce.readSauce);
router.put("/:_id", auth, multer, sauce.updateSauce);
router.delete("/:id", auth, sauce.deleteSauce);
router.get("/", auth, sauce.listSauces);
router.post("/:_id/like", auth, like.likeSauce);

module.exports = router;
