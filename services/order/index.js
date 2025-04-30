const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Order, Customer, Product, Business } = require('../../models');


// ------------- Add Order Api ----------------

const addOrder = asyncErrorHandler(async (req,res)=>{
    const {customer_id, product_id, business_id} = req.body

    await Order.create({
        customer_id,
        product_id,
        business_id
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.CREATED
    })
})

// ------------- Get All Order Api ----------------

const getAllOrder = asyncErrorHandler(async (req,res)=>{
  
    const allOrder = await Order.findAll({
        attributes:["id"],
        include:[{
            model:Customer,
            as:"customer",
            attributes:["id","name","email","address"]
        },
       {
        model:Product,
        as:"product",
        attributes:["id","name","description","price"]
       },{
        model:Business,
        as:"business",
        attributes:["id", "name"]
       }
    ]
    })
   

    if(!allOrder){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }
   

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        allOrder
    })
})

// ------------- Get Single Order Api ----------------

const getSingleOrder = asyncErrorHandler(async (req,res)=>{
    const {order_id} = req.params

    if(!order_id){
        return response.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const singleOrder = await Order.findOne({
        where:{id:order_id},
        attributes:["id"],
        include:[{
            model:Customer,
            as:"customer",
            attributes:["id","name","email","address"]
        },
       {
        model:Product,
        as:"product",
        attributes:["id","name","description","price"]
       },{
        model:Business,
        as:"business",
        attributes:["id", "name"]
       }
    ]
    })

    if(!singleOrder){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        singleOrder
    })
})

// ------------- Update Order Api ----------------


const updateOrder = asyncErrorHandler(async (req,res)=>{
    const {order_id} = req.params

    if(!order_id){
        return response.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const updates = {}
    const allowedField = ["customer_id", "product_id", "category_id"]

    allowedField.forEach((field)=>{
        if(req.body[field] !== undefined){

            updates[field] = req.body[field]
        }
    })

    await Order.update(updates, {
        where:{id:order_id}
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.UPDATED
    })


})

// ------------- Delete Order Api ----------------

const deleteOrder = asyncErrorHandler(async (req,res)=>{
    const {order_id} = req.params
    if(!order_id){
        return response.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const deleteOrder = await Order.destroy({
        where:{id:order_id}
    })

    if(!deleteOrder){
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



module.exports = {addOrder, getAllOrder, getSingleOrder, updateOrder, deleteOrder}