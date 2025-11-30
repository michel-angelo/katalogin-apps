const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductBySlug,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);
router.get("/:slug", getProductBySlug);

module.exports = router;
