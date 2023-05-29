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
users.updateOne = async (req, res, next) => {
  const uid = req.id
  const { displayname, address, phone_number, password, email } = req.body

  try {
    const { data } = await usersDb.updateOne(
      uid,
      displayname,
      address,
      phone_number,
      password,
      email
    )

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

users.getBySubstring = async (req, res, next) => {
  const uid = req.id
  const substring = req.params.substring

  try {
    const { data } = await usersDb.getBySubstring(substring, uid)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}

users.deleteById = async (req, res, next) => {
  const uid = req.params.uid

  try {
    const { data } = await usersDb.deleteById(uid)

    res.send(data)
  } catch (error) {
    next(new AppError('Internal server error', 502, error.message, false))
  }
}
module.exports = users
