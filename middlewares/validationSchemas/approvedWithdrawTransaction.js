const Joi = require("joi");

const schema = Joi.object({
    userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.base": "User id must be a string",
        "any.required": "User Id is required",
        "string.guid": "Reciept id must be a valid UUID"
      }),
      transactionId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.base": "Transaction id must be a string",
        "any.required": "Transaction Id is required",
         "string.guid": "Reciept id must be a valid UUID"
      }),
     recieptId: Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "string.base": "Reciept id must be a string",
    "any.required": "Reciept Id is required",
    "string.guid": "Reciept id must be a valid UUID"
  })
});

module.exports = schema;