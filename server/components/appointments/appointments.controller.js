const appointments = {}
const AppError = require('../../utils/AppError.js')
const appointmentsDb = require('./appointments.model.js')

appointments.add = async (req, res, next) => {
  const { patients_id, doctors_id } = req.body
  const org_id = req.id

  try {
    const { data } = await appointmentsDb.add(patients_id, doctors_id, org_id)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
appointments.getAll = async (req, res, next) => {
  const org_id = req.id
  try {
    const { data } = await appointmentsDb.getAll(org_id)
    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
appointments.getAllByDate = async (req, res) => {
  const org_id = req.id
  const { date } = req.body
  try {
    const { data } = await appointmentsDb.getAllByDate(org_id, date)
    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

appointments.getByDoctor = async (req, res) => {
  const { doctors_id } = req.body
  const org_id = req.id

  try {
    const { data } = await appointmentsDb.getByDoctor(org_id, doctors_id)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

appointments.getByOrg = async (req, res) => {
  const { doctors_id } = req.body
  const org_id = req.id

  try {
    const { data } = await appointmentsDb.getByDoctor(org_id, doctors_id)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

appointments.getByDoctorAndDate = async (req, res, next) => {
  const { date } = req.body

  const doctors_id = req.id

  try {
    const { data } = await appointmentsDb.getByDoctorAndDate(doctors_id, date)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

appointments.getByOrgDoctorAndDate = async (req, res, next) => {
  const { date, doctor_id } = req.body

  const org_id = req.id

  console.log(date, org_id, doctor_id)

  try {
    const { data } = await appointmentsDb.getByOrgDoctorAndDate(
      org_id,
      doctor_id,
      date
    )

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
module.exports = appointments
