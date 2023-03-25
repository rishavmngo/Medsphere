const express = require('express')
const router = express.Router()
const department = require('./department.controller')
const jwt = require('../../middlewares/jwt')

router.get('/getAll', jwt.verify, department.getAll)
router.post('/add', jwt.verify, department.add)

module.exports = router
