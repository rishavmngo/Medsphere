const jwt = require('jsonwebtoken')
const config = require('../config/config.js')
const AppError = require('../utils/AppError.js')
const jwtUtils = {}

jwtUtils.createAccessToken = (uid) => {
  return jwt.sign({ id: uid }, config.JWT_SECRET)
}

jwtUtils.verify = (req, res, next) => {
  const header = req.header('Authorization')
  const token = header && header.split(' ')[1]

  if (!token)
    return next(new AppError('Unauthorized', 402, 'token not provided', true))

  try {
    const resp = jwt.verify(token, config.JWT_SECRET)
    req.id = resp.id
  } catch (error) {
    return next(new AppError('Unauthorized', 402, error.message, true))
  }
  next()
}

module.exports = jwtUtils
