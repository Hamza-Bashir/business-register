const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business, User } = require('../../models');
const {Op} = require("sequelize")


// ------------- Get All User Api -----------------

const getAllUser = asyncErrorHandler(async (req,res)=>{

    const {page = 1, limit = 5} = req.query

    const offset = (page - 1) * limit
   
    const {count, rows} = await User.findAndCountAll({
        where:{isAdmin:false},
        attributes:["name", "email"],
        limit,
        offset
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        totalUser:count,
        toatalPage:Math.ceil(count / limit),
        users:rows
    })
})


// ------------- Get Single User Api -----------------

const getSingleUser = asyncErrorHandler(async (req,res)=>{
    const {userId} = req.params

    const singleUser = await User.findOne({
        where:{id:userId},
        attributes:["name","email"]
    })

    if(!singleUser){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        singleUser
    })
})


// ------------- Delete User Api -----------------

const deleteUser = asyncErrorHandler(async (req,res)=>{
    const {userId} = req.params

    const deleteUser = await User.destroy({
        where:{id:userId}
    })

    if(!deleteUser){
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


// ------------- Search User Api -----------------


const searchUser = asyncErrorHandler(async (req,res)=>{
    let query = {
        isAdmin:false
    }

    const {name,email} = req.query

    if(name){
        query.name = { [Op.iLike]: `%${name}%`}
    }

    if(email){
        query.email = {[Op.iLike]: `%${email}%`}
    }

    const users = await User.findAll({
        where:query,
        attributes:["name", "email"]
    })

    if(users.length === 0){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.SUCCESS,
            message:TEXTS.NOT_FOUND
        })
    }

    const totalUser = users.length
    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        totalUser,
        users
    })

})

// ------------- Get All Business Api -----------------

const getAllBusiness = asyncErrorHandler(async (req,res)=>{

    const {page = 1, limit = 3} = req.query

    const offset = (page - 1) * limit
    
    const {count, rows} = await Business.findAndCountAll({
        attributes:["name", "address", "contact_number", "isApproved"],
        limit,
        offset
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        totalBusiness:count,
        totalPage: Math.ceil(count / limit),
        business:rows
    })
})


// ------------- Update Business isApproved Api -----------------

const updateBsuiness = asyncErrorHandler(async (req, res) => {
    
    const { businessId } = req.params;
    const { isApproved } = req.body;
    

    const existingBusiness = await Business.findOne({
        where: { id: businessId }
    });

    

    if (!existingBusiness) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            message: "Business not found"
        });
    }

    

    existingBusiness.isApproved = isApproved;
    await existingBusiness.save();

    

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        message: TEXTS.UPDATED
    });
});




module.exports = {getAllUser, getSingleUser, deleteUser,searchUser, getAllBusiness, updateBsuiness}