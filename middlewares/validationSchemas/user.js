const joi = require("joi")

const signUpSchema = joi.object({
    name:joi.string().min(3).max(20).required().messages({
        "string.base":"Name must be string",
        "string.min":"Name must be greater than 3 character",
        "string.max":"Name must be less than 20 character",
        "any.required":"Name is required"
    }),
    email:joi.string().email().required().messages({
        "string.base":"Email must be string",
        "string.email":"'Email' must be valid email",
        "any.required":"Email is required"
    }),
    password:joi.string().min(5).max(15).required().messages({
        "string.base":"Password must be string",
        "any.required":"Password is required",
        "string.min":"Password must be greater than 5 character",
        "string.max":"Password must be less than 15 character"
    }),
    isAdmin:joi.boolean().optional().messages({
        "boolean.base":"'isAdmin' must be a boolean value"
    })
})

const loginSchema = joi.object({
    email:joi.string().email().required().messages({
        "string.base":"Email must be string",
        "any.required":"Email must be required",
        "string.email":"'Email' must be valid email"
    }),
    password:joi.string().min(5).max(15).required().messages({
        "string.base":"Password must be string",
        "any.required":"Password is required",
        "string.min":"Password must be greater than or equal to 5 character",
        "string.max":"Password must be less than or equal to 15  character"
    })
})

module.exports = {signUpSchema, loginSchema}