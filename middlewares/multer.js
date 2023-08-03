const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images/"),
  filename: (req, file, cb) => {
    console.log(file), cb(null, Date.now() + "." + file.originalname.split(".").at(-1));
  },
});

module.exports = multer({ storage }).fields([{ name: "image", maxCount: 1 }]);
