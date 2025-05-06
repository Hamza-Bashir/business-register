const router = require("express").Router()
const saleService = require("../../services/sale")

router.post("/user/add-sale", saleService.addSale)
router.get("/user/get-sale-detail", saleService.getSaleDetail)

module.exports = router