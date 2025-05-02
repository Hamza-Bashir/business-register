const router = require("express").Router()
const stockService = require("../../services/stock")


router.post("/add-stock", stockService.addStock)
router.get("/get-stock-detail", stockService.getDetail)

module.exports = router