const express = require('express')
const router = express.Router()
const user = require('./users.controller')
const jwt = require('../../middlewares/jwt')

router.get('/get', jwt.verify, user.get)
router.get('/getAllDoctors', jwt.verify, user.getAllDoctors)

module.exports = router
