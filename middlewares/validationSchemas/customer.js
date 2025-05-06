const joi = require("joi")

const customerSchema = joi.object({
    name:joi.string().required().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    email:joi.string().email().required().messages({
        "string.base":"Email must be string",
        "string.email":"'Email' must be valid email",
        "any.required":"Email is required"
    }),
    address:joi.string().required().messages({
        "string.base":"Address must be string",
        "any.required":"Address is required"
    })
})

const updateCustomerSchema = joi.object({
    name:joi.string().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    email:joi.string().email().messages({
        "string.base":"Email must be string",
        "string.email":"'Email' must be valid email",
        "any.required":"Email is required"
    }),
    address:joi.string().messages({
        "string.base":"Address must be string",
        "any.required":"Address is required"
    })
})

module.exports = {updateCustomerSchema, customerSchema}