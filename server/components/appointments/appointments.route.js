const express = require('express')
const router = express.Router()
const appointments = require('./appointments.controller')
const jwt = require('../../middlewares/jwt')

router.post('/add', jwt.verify, appointments.add)
router.get('/getAll', jwt.verify, appointments.getAll)
router.post('/getAllByDate', jwt.verify, appointments.getAllByDate)

router.post('/getByDoctor', jwt.verify, appointments.getByDoctor)
router.post('/getByDoctorAndDate', jwt.verify, appointments.getByDoctorAndDate)

module.exports = router
