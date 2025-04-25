const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business } = require('../../models');

const addBusiness = asyncErrorHandler(async (req,res)=>{
    const {name,address,contact_number, is_approved} = req.body
    

    const business = await Business.create({
        user_id:req.user.id,
        name,
        address,
        contact_number,
        isApproved:is_approved
    })
    
   

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.BUSINESS_CREATE
    })

    console.log("done")

    
})

module.exports = {addBusiness}