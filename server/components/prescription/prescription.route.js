const express = require('express')
const router = express.Router()
const prescription = require('./prescription.controller')
const jwt = require('../../middlewares/jwt')

router.post('/create', jwt.verify, prescription.create)
router.get(
  '/getByPrescriptionId/:prescriptionId',
  jwt.verify,
  prescription.getById
)
router.get(
  '/getByAppointmentId/:appointmentId',
  jwt.verify,
  prescription.getByAppointmentId
)

router.get(
  '/prescribedMedicine/getAll/:prescriptionId',
  prescription.getAllPrescribedMedicine
)

//medicine boy
// router.post('/medicine/add', prescription.addMedicine)
// router.get('/medicine/getAll', prescription.addMedicine)
// router.put('/medicine/update', prescription.addMedicine)
module.exports = router
