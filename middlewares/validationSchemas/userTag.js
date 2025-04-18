const Joi = require("joi");

const userTagSchema = Joi.object({
  userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "any.required": "User ID is required.",
    "string.guid": "User ID must be a valid UUID.",
    "string.empty": "User ID cannot be empty.",
  }),

  tagId: Joi.string()
    .guid({ version: "uuidv4" })
    .optional()
    .allow(null)
    .messages({
      "string.guid": "Tag ID must be a valid UUID if provided.",
    }),

  status: Joi.boolean().messages({
    "boolean.base": "Status must be a boolean value.",
    "string.empty": "Status cannot be empty.",
  }),
});

module.exports = userTagSchema;
