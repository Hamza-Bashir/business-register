const router = require("express").Router()
const stockService = require("../../services/stock")


router.post("/user/add-stock", stockService.addStock)
router.get("/user/get-stock-detail", stockService.getDetail)

module.exports = router