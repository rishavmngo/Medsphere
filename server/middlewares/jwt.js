const jwt = require('jsonwebtoken')
const config = require('../config/config.js')
const jwtUtils = {}

jwtUtils.createAccessToken = (uid) => {
  return jwt.sign({ id: uid }, config.JWT_SECRET)
}

jwtUtils.verify = (req, res, next) => {
  const header = req.header('Authorization')
  const token = header && header.split(' ')[1]

  if (!token) return res.send({ error: true, message: 'token not provided' })

  try {
    const { id } = jwt.verify(token, config.JWT_SECRET)
    req.id = id
  } catch (error) {
    req.id = null
  }
  next()
}

module.exports = jwtUtils
