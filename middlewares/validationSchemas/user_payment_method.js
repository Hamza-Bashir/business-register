const Joi = require("joi");

const schema = Joi.object({
  withdrawPaymentMethodId: Joi.string().messages({
    "string.base":"Withdraw Payment Method must be string"
  }),
  fields: Joi.object({
    name: Joi.string().messages({
      "string.base": "Field name must be a string"
    }),
    account: Joi.string().messages({
      "string.base": "Field account must be a string"
    }),
    text:Joi.string().messages({
      "string.base":"Text must be string"
    })
  }).messages({
    "object.base": "Fields must be an object"
  })
});

module.exports = schema;