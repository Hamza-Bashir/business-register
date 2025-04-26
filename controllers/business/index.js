const router = require("express").Router()

const businessService = require("../../services/business");


router.post("/add-business", businessService.addBusiness)
router.get("/all-businesses", businessService.getAllBusiness)
router.get("/get-single-business/:id", businessService.getSingleBusiness)
router.put("/update-business/:id", businessService.updateBusiness)

router.delete("/delete-business/:id", businessService.deleteBusiness)

module.exports = router