const joi = require('joi')

const schema = {}

schema.loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required().min(8),
})

schema.registerSchema = joi.object({
  email: joi.string().required(),
  displayName: joi.string().required(),
  password: joi.string().required().min(8),
  organisation_id: joi.number().integer().positive().allow(null),
  is_organisation: joi.boolean().default(false),
})

module.exports = schema
