const router = require("express").Router()
const customerService = require("../../services/customer")
const {customerSchema, updateCustomerSchema} = require("../../middlewares/validationSchemas/customer")

const validate = require("../../middlewares/validator")

router.post("/add-customer/:business_id", validate(customerSchema), customerService.addCustomer)
router.get("/get-all-customer/:business_id", customerService.getAllCustomer)
router.get("/get-single-customer/:customer_id", customerService.getSingleCustomer)
router.put("/update-customer/:customer_id", validate(updateCustomerSchema),customerService.updateCustomer)
router.delete("/delete-customer/:customer_id", customerService.deleteCustomer)

module.exports = router