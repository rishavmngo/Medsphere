const express = require('express')
const router = express.Router()
const patients = require('./patients.controller')
const jwt = require('../../middlewares/jwt')

router.get('/getAll', jwt.verify, patients.getAll)
router.post('/add', jwt.verify, patients.add)

module.exports = router
