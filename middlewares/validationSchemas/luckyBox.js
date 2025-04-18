const Joi = require("joi");

const schema = Joi.object({
   diamond: Joi.number().positive().strict().required().messages({
      "number.base": "Diamond must be number",
      "any.required": "Diamond is required"
   }),
   perPerson: Joi.number().strict().required().messages({
      "number.base": "Per Person must be number",
      "any.required": "Per Person is required"
   }),
   countDown: Joi.string().valid("3 min", "5 min", "10 min").required().messages({
      "any.only": "countDown must be one of '3 min', '5 min', '10 min'",
      "any.required": "countDown is required"
   }),
   participantCondition: Joi.string().optional().allow('').valid("all_audience", "follow_host").messages({
      "string.base": "Participant must be string"
   }),
   roomId: Joi.string().required().messages({
    "string.base": "roomId must be string",
    "any.required": "roomId is required"
 }),
});

module.exports = schema