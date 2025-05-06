const router = require("express").Router()
const orderService = require('../../services/order')

router.post("/user/add-order", orderService.addOrder)
router.get("/user/get-all-order", orderService.getAllOrder)
router.get("/user/get-single-order/:order_id", orderService.getSingleOrder)
router.put("/user/update-order/:order_id", orderService.updateOrder)
router.delete("/user/delete-order/:order_id", orderService.deleteOrder)

module.exports = router