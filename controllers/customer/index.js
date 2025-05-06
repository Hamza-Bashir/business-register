const router = require("express").Router()
const customerService = require("../../services/customer")
const {customerSchema, updateCustomerSchema} = require("../../middlewares/validationSchemas/customer")

const validate = require("../../middlewares/validator")

router.post("/user/add-customer/:business_id", validate(customerSchema), customerService.addCustomer)
router.get("/user/get-all-customer/:business_id", customerService.getAllCustomer)
router.get("/user/get-single-customer/:customer_id", customerService.getSingleCustomer)
router.put("/user/update-customer/:customer_id", validate(updateCustomerSchema),customerService.updateCustomer)
router.delete("/user/delete-customer/:customer_id", customerService.deleteCustomer)

module.exports = router