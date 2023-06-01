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

prescription.addMedicine = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  const { medicine_id, dosage, duration } = req.body

  try {
    const response = await prescriptionDb.addMedicineToPrescription(
      prescriptionId,
      medicine_id,
      dosage,
      duration
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.getAllPrescribedMedicine = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  try {
    const response = await prescriptionDb.getPrescribedMedicine(prescriptionId)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.updatePrescribedMedicine = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  const { id, medicine_id, dosage, duration } = req.body

  try {
    const response = await prescriptionDb.updatePrescribedMedicine(
      id,
      prescriptionId,
      medicine_id,
      dosage,
      duration
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.deletePrescriptionById = async (req, res, next) => {
  const id = req.params.prescribedMedicineId

  try {
    const response = await prescriptionDb.deletePrescriptionById(id)
    if (response.error)
      return next(
        new AppError('Internal server error', 404, response.error.message, true)
      )
    else res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

//advice

prescription.getAllPrescribedAdvices = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  try {
    const response = await prescriptionDb.getAllPrescribedAdvices(
      prescriptionId
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.addPrescribedAdvice = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  const { advice } = req.body

  try {
    const response = await prescriptionDb.addAdviceToPrescription(
      prescriptionId,
      advice
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.updatePrescribedAdvice = async (req, res, next) => {
  const prescriptionId = req.params.prescriptionId

  const { id: prescribedAdviceId, advice } = req.body

  try {
    const response = await prescriptionDb.updatePrescribedAdvice(
      prescriptionId,
      prescribedAdviceId,
      advice
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}
prescription.deletePrescribedAdviceById = async (req, res, next) => {
  const prescriptionId = req.params.PrescribedAdviceId

  try {
    const response = await prescriptionDb.deletePrescribedAdviceById(
      prescriptionId
    )
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.getConfigrationForOrg = async (req, res, next) => {
  const orgId = req.params.orgId

  try {
    const response = await prescriptionDb.getConfigrationForOrg(orgId)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

prescription.updateConfigration = async (req, res, next) => {
  const orgId = req.params.orgId
  const { config } = req.body

  try {
    const response = await prescriptionDb.getConfigrationForOrg(orgId)
    let result
    console.log(response.data.config.length)
    if (response.data.config.length > 5)
      result = await prescriptionDb.updateConfig(orgId, config)
    else result = await prescriptionDb.addConfig(orgId, config)
    res.send(result)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}
module.exports = prescription
