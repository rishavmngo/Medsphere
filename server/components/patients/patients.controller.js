const patients = {}
const AppError = require('../../utils/AppError')
const patientsDb = require('./patients.model')

patients.getAll = async (req, res, next) => {
  const uid = req.id

  try {
    const { data } = await patientsDb.getAll(uid)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
patients.add = async (req, res, next) => {
  const uid = req.id
  const { name, age, gender } = req.body

  try {
    const { data } = await patientsDb.add(name, age, gender, uid)
    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

patients.getBySubstring = async (req, res, next) => {
  const uid = req.id
  const substring = req.params.substring

  try {
    const { data } = await patientsDb.getBySubstring(substring, uid)
    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
module.exports = patients
