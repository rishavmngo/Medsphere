const express = require('express')
const router = express.Router()
const appointments = require('./appointments.controller')
const jwt = require('../../middlewares/jwt')
const db = require('../../db/db.js')
const AppError = require('../../utils/AppError')

router.post('/add', jwt.verify, appointments.add)
router.get('/getAll', jwt.verify, appointments.getAll)
router.post('/getAllByDate', jwt.verify, appointments.getAllByDate)

router.post('/getByDoctor', jwt.verify, appointments.getByDoctor)
router.post('/getByOrg', jwt.verify, appointments.getByOrg)
router.post('/getByDoctorAndDate', jwt.verify, appointments.getByDoctorAndDate)
router.get(
  '/getOrgAppointmentsCountForToday',
  jwt.verify,
  appointments.getOrgAppointmentsCountForToday
)
router.get(
  '/getDoctorsAppointmentsCountForToday/:doctorsId/:orgId',
  jwt.verify,
  appointments.getDoctorsAppointmentsCountForToday
)
// router.post('/getDoctorsAppointmentCountForToday',jwt.verify,appointments.)
router.post(
  '/getByOrgDoctorAndDate',
  jwt.verify,
  appointments.getByOrgDoctorAndDate
)
router.put(
  '/update/:appointmentId',
  jwt.verify,
  appointments.updateAppointmentsById
)

module.exports = router
