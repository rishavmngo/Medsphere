const AppError = require('../utils/AppError.js')
exports.validate = (schema) => (req, res, next) => {
  console.log(req.body)
  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new AppError('validation error', 402, error.details[0].message, true)
    )
  } else {
    next()
  }
}
