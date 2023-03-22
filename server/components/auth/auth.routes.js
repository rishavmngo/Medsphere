const express = require('express')
const router = express.Router()
const auth = require('./auth.controller')
const { validate } = require('../../middlewares/schemaValidator')
const { loginSchema, registerSchema } = require('./auth.schema')

router.post('/login', validate(loginSchema), auth.login)
router.post('/register', validate(registerSchema), auth.register)

module.exports = router
