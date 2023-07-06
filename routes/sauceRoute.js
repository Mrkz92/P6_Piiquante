const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauceController");

router.get("/", sauceCtrl.getAllSauces);
router.post("/", sauceCtrl.createSauce);
router.get("/:id", sauceCtrl.getOneSauce);

module.exports = router;
