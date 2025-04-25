const router = require("express").Router()

const businessService = require("../../services/business");


router.post("/add-business", businessService.addBusiness)

module.exports = router