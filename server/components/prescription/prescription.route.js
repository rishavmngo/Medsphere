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
  '/medicine/getAll/:prescriptionId',
  jwt.verify,
  prescription.getAllPrescribedMedicine
)
router.post(
  '/medicine/add/:prescriptionId',
  jwt.verify,
  prescription.addMedicine
)
router.put(
  '/medicine/update/:prescriptionId',
  jwt.verify,
  prescription.updatePrescribedMedicine
)
router.delete(
  '/medicine/delete/:prescribedMedicineId',
  jwt.verify,
  prescription.deletePrescriptionById
)
module.exports = router
