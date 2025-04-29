const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Customer, Business } = require('../../models');

// --------------- Add Customer ------------------

const addCustomer = asyncErrorHandler(async (req,res)=>{
    const {business_id} = req.params
    const {name,email,address} = req.body

    if(!business_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }
    

    const existingBusiness = await Business.findOne({where:{
        id:business_id
    }})
    

    if(!existingBusiness){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    await Customer.create({
        business_id,
        name,
        email,
        address
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.CREATED
    })
})

// --------------- Get All Customer ------------------

const getAllCustomer = asyncErrorHandler(async (req,res)=>{
    const {business_id} = req.params
    

    if(!business_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }
    
    

    const existingBusiness = await Business.findOne({where:{
        id:business_id
    }})
    
    
    if(!existingBusiness){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }
    

    const allCustomer = await Customer.findAll({
        attributes:["id","name", "email", "address"],
        include:[{
            model:Business,
            as:"business",
            attributes:["id", "name"]
        }]
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        allCustomer
    })
})

// --------------- Get Single Customer ------------------

const getSingleCustomer = asyncErrorHandler(async (req,res)=>{
    
    const {customer_id} = req.params

    if(!customer_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    

    const singleCustomer = await Customer.findOne({
        attributes:["id", "name", "email", "address"],
        include:[{

            model:Business,
            as:"business",
            attributes:["id", "name"]
        }]
    })

   

    if(!singleCustomer){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }


    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        singleCustomer
    })
})

// --------------- Update Customer ------------------

const updateCustomer = asyncErrorHandler(async (req,res)=>{
    const {customer_id} = req.params

    if(!customer_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const updates = {}
    const allowedField = ["name", "email", "address"]

    allowedField.forEach((field)=>{
        if(req.body[field] !== undefined){
            updates[field] = req.body[field]
        }
    })

    await Customer.update(updates, {
        where:{id:customer_id}
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.UPDATED
    })

})


// --------------- Delete Customer ------------------


const deleteCustomer = asyncErrorHandler(async (req,res)=>{

    const {customer_id} = req.params

    if(!customer_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    await Customer.destroy({
        where:{id:customer_id}
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.DELETED
    })

})




module.exports = {addCustomer, getAllCustomer, getSingleCustomer, updateCustomer, deleteCustomer}