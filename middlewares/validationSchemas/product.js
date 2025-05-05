const joi = require("joi")

const productSchema = joi.object({
    name:joi.string().required().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    description:joi.string().required().messages({
        "string.base":"Description must be string",
        "any.required":"Description is required"
    }),
    price:joi.number().required().messages({
        "number.base":"Price must be number",
        "any.required":"Price is required"
    }),
    quantity:joi.number().required().messages({
        "number.base":"Quantity must be number",
        "any.required":"Quantity is required"
    })
})

const updateProductSchema = joi.object({
    name:joi.string().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    description:joi.string().messages({
        "string.base":"Description must be string",
        "any.required":"Description is required"
    }),
    price:joi.number().messages({
        "number.base":"Price must be number",
        "any.required":"Price is required"
    }),
    quantity:joi.number().messages({
        "number.base":"Quantity must be number",
        "any.required":"Quantity is required"
    })
})

module.exports = {productSchema, updateProductSchema}