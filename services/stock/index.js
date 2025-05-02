const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Stock, Product } = require('../../models');


// ----------- Add Stock ---------------------

const addStock = asyncErrorHandler(async (req,res)=>{

    const {product_id} = req.body
    
    if(!product_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const existingProduct = await Product.findOne({
        where:{id:product_id}
    })

    if(!existingProduct){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    await Stock.create({
        product_id:existingProduct.id
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.CREATED
    })

    
})


// ----------- Get Detail Stock ---------------------

const getDetail = asyncErrorHandler(async (req,res)=>{
    const stockWithProduct = await Stock.findAll({
        attributes:["id"],
        include:[
            {
                model:Product,
                as:"product",
                attributes:["id", "name", "quantity"]
            }
        ]
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.SUCCESS,
        stockWithProduct
    })
})


module.exports = {addStock, getDetail}