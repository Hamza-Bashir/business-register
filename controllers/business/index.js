const router = require("express").Router()

const businessService = require("../../services/business");

const {businessSchema, updateBusinessSchema} = require("../../middlewares/validationSchemas/business")
const validate = require("../../middlewares/validator")


router.post("/add-business", validate(businessSchema), businessService.addBusiness)
router.get("/all-businesses", businessService.getAllBusiness)
router.get("/get-single-business/:id", businessService.getSingleBusiness)
router.put("/update-business/:id", validate(updateBusinessSchema), businessService.updateBusiness)

router.delete("/delete-business/:id", businessService.deleteBusiness)

module.exports = router