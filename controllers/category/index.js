const router = require("express").Router()

const categoryService = require("../../services/category")
const validate = require("../../middlewares/validator")
const categorySchema = require("../../middlewares/validationSchemas/category")


router.post("/user/add-category/:id", validate(categorySchema), categoryService.addCategory)
router.get("/user/get-all-category/:id", categoryService.getAllCategory)
router.get("/user/get-single-category/:id", categoryService.getSingleCategory)
router.put("/user/update-category", validate(categorySchema), categoryService.updateCategory)
router.delete("/user/delete-category", categoryService.deleteCategory)

module.exports = router