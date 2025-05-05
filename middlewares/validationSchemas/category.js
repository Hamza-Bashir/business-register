const joi = require("joi")

const categorySchema = joi.object({
    name:joi.string().required().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    })
})

module.exports = categorySchema