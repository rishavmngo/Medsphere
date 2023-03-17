const express = require('express')

const router = express.Router()
const auth = require('./auth.controller')

router.get('/login', auth.login)
router.get('/register', auth.register)

module.exports = router
