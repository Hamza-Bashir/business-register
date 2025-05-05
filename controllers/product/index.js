const router = require("express").Router()
const productService = require("../../services/product")
const {productSchema, updateProductSchema} = require("../../middlewares/validationSchemas/product")
const validate = require("../../middlewares/validator")

router.post("/add-product/:business_id", validate(productSchema), productService.addProduct)
router.get("/all-product/:category_id", productService.getAllProduct)
router.get("/single-product/:category_id", productService.singleProduct)

router.put("/update-product/:product_id", validate(updateProductSchema), productService.updateProduct)
router.delete("/delete-product/:product_id", productService.deleteProduct)

module.exports = router