const router = require("express").Router()
const productService = require("../../services/product")

router.post("/add-product/:business_id", productService.addProduct)
router.get("/all-product/:category_id", productService.getAllProduct)
router.get("/single-product/:category_id", productService.singleProduct)

module.exports = router