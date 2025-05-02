const router = require("express").Router()
const saleService = require("../../services/sale")

router.post("/add-sale", saleService.addSale)
router.get("/get-sale-detail", saleService.getSaleDetail)

module.exports = router