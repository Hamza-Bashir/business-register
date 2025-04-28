const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business, User } = require('../../models');


// ------------------ Add Business  ------------------
const addBusiness = asyncErrorHandler(async (req,res)=>{
    
    const {name,address,contact_number, is_approved} = req.body
    
    const existingBusiness = await Business.findOne({where:{name}})
   

    if(existingBusiness){
        return res.status(STATUS_CODES.CONFLICT).json({
            statusCode:STATUS_CODES.CONFLICT,
            message:TEXTS.CONFLICT
        })
    }
    
    

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

   

    

    
})


// ------------------ Get All Business ------------------

const getAllBusiness = asyncErrorHandler(async (req,res)=>{
    
    const allBusinesses = await Business.findAll({
        attributes:["id","name","address","contact_number","isApproved"],
        include:[{
            model:User,
            as:"user",
            attributes:["id","name","email"]
        }]
    })
    

    if(!allBusinesses){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        Business:allBusinesses
    })

   
})


// ------------------ Get Single Business  ------------------


const getSingleBusiness = asyncErrorHandler(async (req,res)=>{
    const {id} = req.params

    if(!id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const getBusiness = await Business.findOne({
        attributes:["id","name","address","contact_number","isApproved"],
        include:[{
            model:User,
            as:"user",
            attributes:["id","name","email"]
        }]
    })

    if(!getBusiness){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        Business:getBusiness
    })
})

// ------------------ Update Business  ------------------

const updateBusiness = asyncErrorHandler(async (req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }
    

    const business = await Business.findOne({
        where:{user_id:req.user.id}
    })
    

    if(!business){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }
    

    const allowedFields = ["name","address","contact_number"]
    const updates = {}
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });
      

      await Business.update(updates, {
        where:{id:id}
      })

      res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.UPDATED
      })
      
})


// ------------------ Delete Business  ------------------

const deleteBusiness = asyncErrorHandler(async (req,res)=>{
    
    
    const {id} = req.params
    if(!id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const deleteBusiness = await Business
    .destroy({
        where:{
            user_id:req.user.id,
            id:id
        }
    })

    

    if(!deleteBusiness){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.DELETED
    })
})



module.exports = {addBusiness, getAllBusiness, getSingleBusiness, updateBusiness, deleteBusiness}