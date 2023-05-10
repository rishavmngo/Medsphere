const AppError = require('../../utils/AppError')
const prescriptionDb = require('./prescription.model')
const prescription = {}

prescription.create = async (req, res, next) => {
  const { appointment_id } = req.body

  try {
    const existingPrescription = await prescriptionDb.getByAppointmentId(
      appointment_id
    )
    if (!!existingPrescription.data) return res.send(existingPrescription.data)

    const response = await prescriptionDb.create(appointment_id)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.getById = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  try {
    const response = await prescriptionDb.getById(prescriptionId)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.getByAppointmentId = async (req, res, next) => {
  const appointmentId = req.params.appointmentId

  try {
    const response = await prescriptionDb.getByAppointmentId(appointmentId)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.getAllPrescribedMedicine = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  try {
    const response = await prescriptionDb.getAllPrescribedMedicine(
      prescriptionId
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}
module.exports = prescription
