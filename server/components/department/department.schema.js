const joi = require('joi')

const schema = {}

schema.updateDepartmentSchema = joi.object({
  id: joi.number().integer().required(),
  name: joi.string().required(),
})

schema.deleteDepartmentSchema = joi.object({
  id: joi.number().integer().required(),
})
module.exports = schema
