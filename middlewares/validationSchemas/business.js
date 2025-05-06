const joi = require("joi")
const { UUIDV4 } = require("sequelize")

const businessSchema = joi.object({
    name:joi.string().required().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    address:joi.string().required().messages({
        "string.base":"Address must be string",
        "any.required":"Address is required"
    }),
    contact_number:joi.string().required().messages({
        "string.base":"Contact number must be string",
        "any.required":"Contact number is required"
    }),
    is_approved:joi.string().valid("pending","accept", "reject").required().messages({
        "any.only":"'is_approved' must be one of [pending, reject, accept]",
        "string.base":"is_approved must be string",
        "any.required":"is_approved is required"
    })
})


const updateBusinessSchema = joi.object({
    name:joi.string().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    address:joi.string().messages({
        "string.base":"Address must be string",
        "any.required":"Address is required"
    }),
    contact_number:joi.string().messages({
        "string.base":"Contact number must be string",
        "any.required":"Contact number is required"
    }),
    is_approved:joi.string().valid("pending","accept", "reject").required().messages({
        "any.only":"'is_approved' must be one of [pending, reject, accept]",
        "string.base":"is_approved must be string",
        "any.required":"is_approved is required"
    })
})

module.exports = {businessSchema, updateBusinessSchema}