const Joi = require("joi");

const schema = Joi.object({
  type: Joi.string()
    .valid(
      "official",
      "admin",
      "starAgency",
      "businessDevelopment",
      "customerSupport"
    )
    .required()
    .messages({
      "any.required": "Type is required.",
      "string.empty": "Type cannot be empty.",
      "any.only":
        "Type must be one of the following: official, admin, starAgency, businessDevelopment, customerSupport.",
    }),

  pictureUrl: Joi.string().required().messages({
    "any.required": "Picture URL is required if provided.",
    "string.empty": "Picture URL cannot be empty.",
  }),
});

module.exports = schema;
