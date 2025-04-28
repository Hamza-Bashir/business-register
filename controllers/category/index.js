const router = require("express").Router()

const categoryService = require("../../services/category")


router.post("/add-category/:id", categoryService.addCategory)
router.get("/get-all-category/:id", categoryService.getAllCategory)
router.get("/get-single-category/:id", categoryService.getSingleCategory)
router.put("/update-category", categoryService.updateCategory)
router.delete("/delete-category", categoryService.deleteCategory)

module.exports = router