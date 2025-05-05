const router = require("express").Router()

const categoryService = require("../../services/category")
const validate = require("../../middlewares/validator")
const categorySchema = require("../../middlewares/validationSchemas/category")


router.post("/add-category/:id", validate(categorySchema), categoryService.addCategory)
router.get("/get-all-category/:id", categoryService.getAllCategory)
router.get("/get-single-category/:id", categoryService.getSingleCategory)
router.put("/update-category", validate(categorySchema), categoryService.updateCategory)
router.delete("/delete-category", categoryService.deleteCategory)

module.exports = router