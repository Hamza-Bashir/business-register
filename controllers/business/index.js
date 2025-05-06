const router = require("express").Router()

const businessService = require("../../services/business");

const {businessSchema, updateBusinessSchema} = require("../../middlewares/validationSchemas/business")
const validate = require("../../middlewares/validator")


router.post("/user/add-business", validate(businessSchema), businessService.addBusiness)
router.get("/user/all-businesses", businessService.getAllBusiness)
router.get("/user/get-single-business/:id", businessService.getSingleBusiness)
router.put("/user/update-business/:id", validate(updateBusinessSchema), businessService.updateBusiness)

router.delete("/user/delete-business/:id", businessService.deleteBusiness)

module.exports = router