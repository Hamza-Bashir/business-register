const router = require("express").Router()
const customerService = require("../../services/customer")

router.post("/add-customer/:business_id", customerService.addCustomer)
router.get("/get-all-customer/:business_id", customerService.getAllCustomer)
router.get("/get-single-customer/:customer_id", customerService.getSingleCustomer)
router.put("/update-customer/:customer_id", customerService.updateCustomer)
router.delete("/delete-customer/:customer_id", customerService.deleteCustomer)

module.exports = router