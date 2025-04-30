const router = require("express").Router()
const orderService = require('../../services/order')

router.post("/add-order", orderService.addOrder)
router.get("/get-all-order", orderService.getAllOrder)
router.get("/get-single-order/:order_id", orderService.getSingleOrder)
router.put("/update-order/:order_id", orderService.updateOrder)
router.delete("/delete-order/:order_id", orderService.deleteOrder)

module.exports = router