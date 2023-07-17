const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauceController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images/"),
  filename: (req, file, cb) => {
    console.log(file), cb(null, Date.now() + "." + file.originalname.split(".").at(-1));
  },
});
const images = multer({ storage });

router.post("/", images.fields([{ name: "image", maxCount: 1 }]), sauceCtrl.createSauce);
router.put("/:id", sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);
// router.post("/:id/like", sauceCtrl.likeSauce);

router.get("/", sauceCtrl.getAllSauces);
router.get("/:id", sauceCtrl.getOneSauce);

module.exports = router;
