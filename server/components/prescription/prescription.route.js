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

//medicine
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

//Advice

router.get(
  '/advice/getAll/:prescriptionId',
  jwt.verify,
  prescription.getAllPrescribedAdvices
)

router.post(
  '/advice/add/:prescriptionId',
  jwt.verify,
  prescription.addPrescribedAdvice
)

router.put(
  '/advice/update/:prescriptionId',
  jwt.verify,
  prescription.updatePrescribedAdvice
)

router.delete(
  '/advice/Delete/:PrescribedAdviceId',
  jwt.verify,
  prescription.deletePrescribedAdviceById
)

router.get(
  '/configration/get/:orgId',
  jwt.verify,
  prescription.getConfigrationForOrg
)
router.put(
  '/configration/update/:orgId',
  jwt.verify,
  prescription.updateConfigration
)

module.exports = router
