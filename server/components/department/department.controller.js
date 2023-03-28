const AppError = require('../../utils/AppError')
const departmentDb = require('./department.model')
const department = {}

department.getAll = async (req, res, next) => {
  const id = req.id
  try {
    const { data } = await departmentDb.getAll(id)

    res.send(data)
  } catch (error) {
    next(new AppError('Server Error', 400, error.message, false))
  }
}
department.add = async (req, res, next) => {
  const id = req.id
  const { name } = req.body
  try {
    const { data } = await departmentDb.add(name, id)

    res.send(data)
  } catch (error) {
    next(new AppError('Server Error', 400, error.message, false))
  }
}

department.update = async (req, res, next) => {
  const { id, name } = req.body
  try {
    const { data } = await departmentDb.update(name, id)

    res.send(data)
  } catch (error) {
    next(new AppError('Server Error', 400, error.message, false))
  }
}

department.delete = async (req, res, next) => {
  const id = req.params.id
  if (!id) next(new AppError('Validation error', 400, 'id not provided', true))
  try {
    const { data } = await departmentDb.delete(id)

    res.send(data)
  } catch (error) {
    next(new AppError('Server Error', 400, error.message, false))
  }
}
module.exports = department
