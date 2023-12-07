const express = require("express");

const product = require("../controllers/product");
const like = require("../controllers/like.js");
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer.js");

const router = express.Router();

router.post("/", auth, multer, Product.createProduct);
router.get("/:id", auth, Product.readProduct);
router.put("/:_id", auth, multer, Product.updateProduct);
router.delete("/:id", auth, Product.deleteProduct);
router.get("/", auth, Product.listProducts);
router.post("/:_id/like", auth, like.likeProduct);

module.exports = router;
