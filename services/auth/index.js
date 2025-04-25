const bcrypt = require("bcrypt");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { generateToken } = require("../../utils/jwtToken");
const { User } = require('../../models');



const signUp = asyncErrorHandler(async (req,res)=>{
  const {name,email,password,isAdmin} = req.body

  const existingUser = await User.findOne({where:{email}})

  if(existingUser){
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode:STATUS_CODES.CONFLICT,
      message:TEXTS.CONFLICT
    })
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password:hashPassword,
    isAdmin:isAdmin || false
  })

 

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode:STATUS_CODES.SUCCESS,
    message:TEXTS.CREATED
  })

  

})

const login = asyncErrorHandler(async (req,res)=>{
  const {email,password} = req.body

  const existingUser = await User.findOne({where:{email}, raw:true} )

  if(!existingUser){
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode:STATUS_CODES.NOT_FOUND,
      message:TEXTS.NOT_FOUND
    })
  }

  console.log(existingUser)

  const isMatch = await bcrypt.compare(password, existingUser.password)

  if(!isMatch){
    return res.status(STATUS_CODES.PASSWORD_NOT_MATCH).json({
      statusCode:STATUS_CODES.PASSWORD_NOT_MATCH,
      message:TEXTS.PASSWORD_NOT_MATCH
    })
  }

  const token = generateToken(existingUser)

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message:TEXTS.LOGIN,
    token
  })

})
module.exports = {
  signUp,
  login
};
