const AppError = require('../../utils/AppError')
const usersDb = require('./users.model')

const users = {}

users.get = async (req, res, next) => {
  const uid = req.id

  try {
    const { data } = await usersDb.getById(uid)

    if (!data)
      return next(
        new AppError('Client Error', 409, "User doesn't exists", true)
      )
    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

users.getAllDoctors = async (req, res, next) => {
  const uid = req.id

  try {
    const { data } = await usersDb.getAllDoctors(uid)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

module.exports = users
