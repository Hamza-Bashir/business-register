const Joi = require("joi");

const schema = Joi.object({
  pictureId: Joi.string().required().messages({
    "string.base": "Picture Id must be a string",
    "any.required": "Picture Id is required"
  }),
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is required"
  }),
  feePercentage: Joi.number().required().messages({
    "number.base": "Fee percentage must be a number",
    "any.required": "Fee percentage is required"
  }),
  arrivalInHours: Joi.number().required().messages({
    "number.base": "ArrivalInHours must be a number",
    "any.required": "ArrivalInHours is required"
  }),
  type: Joi.string().valid('bank', 'jazzcash', 'epay', 'usdt', 'binance', 'easypaisa').required().messages({
        "any.only": "Type must be one of [bank, jazzcash, epay, usdt, binance, easypaisa]",
        "string.base": "Type must be a string",
        "any.required": "Type is required"
    }),
  fields: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Field name must be a string",
      "any.required": "Field name is required"
    }),
    account: Joi.string().required().messages({
      "string.base": "Field account must be a string",
      "any.required": "Field account is required"
    })
  }).required().messages({
    "object.base": "Fields must be an object",
    "any.required": "Fields are required"
  })
});

module.exports = schema;