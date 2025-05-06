const router = require("express").Router()
const productService = require("../../services/product")
const {productSchema, updateProductSchema} = require("../../middlewares/validationSchemas/product")
const validate = require("../../middlewares/validator")

router.post("/user/add-product/:business_id", validate(productSchema), productService.addProduct)
router.get("/user/all-product/:category_id", productService.getAllProduct)
router.get("/user/single-product/:category_id", productService.singleProduct)

router.put("/user/update-product/:product_id", validate(updateProductSchema), productService.updateProduct)
router.delete("/user/delete-product/:product_id", productService.deleteProduct)

module.exports = router