const express = require('express')
const router = express.Router()
const patients = require('./patients.controller')

router.get('/getAll', patients.getAll)
router.post('/add', patients.add)

module.exports = router
