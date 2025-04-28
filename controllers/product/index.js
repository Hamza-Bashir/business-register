const router = require("express").Router()
const productService = require("../../services/product")

router.post("/add-product/:business_id", productService.addProduct)
router.get("/all-product/:category_id", productService.getAllProduct)
router.get("/single-product/:category_id", productService.singleProduct)

router.put("/update-product/:product_id", productService.updateProduct)
router.delete("/delete-product/:product_id", productService.deleteProduct)

module.exports = router