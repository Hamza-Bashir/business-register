const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Category, Business } = require('../../models');

// --------------- Add Category ------------------

const addCategory = asyncErrorHandler(async (req,res)=>{
    const {id} = req.params
    const {name} = req.body
    

    if(!id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }
    

    const existingBusiness = await Business.findOne({where:{
        user_id:req.user.id,
        id:id
    }})
    

    if(!existingBusiness){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }
    
    const existingCategory = await Category.findOne({
        where:{name}
    })

    if(existingCategory){
        return res.status(STATUS_CODES.CONFLICT).json({
            statusCode:STATUS_CODES.CONFLICT,
            message:TEXTS.CONFLICT
        })
    }


     await Category.create({
        business_id:id,
        name
    })

    
    

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.CREATED
    })
})

// --------------- Get All Category ------------------

const getAllCategory = asyncErrorHandler(async (req,res)=>{

    const {id} = req.params
    const allCategory = await Category.findAll({
        attributes:["id","name"],
        include:[{
            model:Business,
            as:"business",
            attributes:["id","name","address","contact_number"]
        }]
    })

    if(!allCategory){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        allCategory
    })
})

// --------------- Get Single Category ------------------

const getSingleCategory = asyncErrorHandler(async (req, res) => {
    const { id: business_id } = req.params;
    const { category_id } = req.query;

    if (!business_id || !category_id) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            message: TEXTS.ID_NOT_FOUND
        });
    }

    
    const category = await Category.findOne({
        attributes:["id","name"],
        include:[{
            model:Business,
            as:"business",
            attributes:["id","name","address","contact_number"]
        }]
    });

    if (!category) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            message: TEXTS.NOT_FOUND  
        });
    }

    
    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        message: TEXTS.FOUND,
        category
    });
});

// --------------- Update Category ------------------

const updateCategory = asyncErrorHandler(async (req,res)=>{
    const {category_id} = req.query
    const {name} = req.body

    if(!category_id){

        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const category = await Category.findOne({where:{
        id:category_id
    }})

    if(!category){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    const updateCategory = await Category.update({name}, {
        where:{id:category_id}
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.UPDATED,
        updateCategory
    })

})


// --------------- Delete Category ------------------

const deleteCategory = asyncErrorHandler(async (req,res)=>{
    const {category_id} = req.query

    if(!category_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    await Category.destroy({
        where:{id:category_id}
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.DELETED
    })
})


module.exports = {addCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory}