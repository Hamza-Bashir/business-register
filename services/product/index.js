const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Product, Business, Category } = require('../../models');
const { raw } = require("express");


// -------------- Add Product Api -------------------

const addProduct = asyncErrorHandler(async (req,res)=>{
   
    const {name, description,price,quantity} = req.body
    const {business_id} = req.params
    const {category_id} = req.headers
   
    const existingBusiness = await Business.findOne({
        where:{id:business_id},
        raw:true
    })
    

    if(!existingBusiness){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    
    const existingCategory = await Category.findOne({
        where:{id:category_id}, raw:true
    })
    

    if(!existingCategory){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

  


    await Product.create({
        category_id,
        business_id,
        name,
        description,
        price,
        quantity
    })
   

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.CREATED
    })

})

// -------------- Get All Product Api -------------------

const getAllProduct = asyncErrorHandler(async (req,res)=>{
    const {category_id} = req.params

    const existingCategory = await Category.findOne({
        where:{id:category_id}
    })

    if(!existingCategory){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    const allProduct = await Product.findAll({
        attributes:["id","name","description","price", "quantity"],
        where:{category_id},
        include:[
            {
                model:Category,
                as:"category",
                attributes:["id","name"]
            },
            {
                model:Business,
                as:"business",
                attributes:["id","name"]
            }
        ]
    })

    if(!allProduct){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        allProduct
    })
})

// -------------- Get Single Product Api -------------------

const singleProduct = asyncErrorHandler(async (req,res)=>{
    const {category_id} = req.params
    const {product_id} = req.headers

    const existingCategory = await Category.findOne({
        where:{id:category_id}
    })

    if(!existingCategory){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    const singleProduct = await Product.findOne({
        attributes:["id","name","description","price", "quantity"],
        where:{id:product_id},
        include:[
            {
                model:Category,
                as:"category",
                attributes:["id","name"]
            },
            {
                model:Business,
                as:"business",
                attributes:["id","name"]
            }
        ]
    })

    if(!singleProduct){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        singleProduct
    })
    

    
})



module.exports = {addProduct, getAllProduct, singleProduct}