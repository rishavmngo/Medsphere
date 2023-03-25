const auth = {}
const { createAccessToken } = require('../../middlewares/jwt.js')
const AppError = require('../../utils/AppError')
const users = require('../users/users.model')

auth.login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const { data: user } = await users.getByEmail(email)
    if (!user)
      return next(new AppError('Client Error', 401, 'Wrong credentials', true))

    if (user.password !== password)
      return next(
        new AppError('Unauthorized', 401, "Password didn't match", true)
      )

    const token = createAccessToken(user.uid)
    if (token) return res.send(token)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

auth.register = async (req, res, next) => {
  console.log(req.body)
  const {
    displayName,
    email,
    age,
    password,
    organisation_id,
    is_organisation,
    department_id,
  } = req.body

  try {
    const userExists = await users.exists(email)

    if (userExists)
      return next(
        new AppError('Client Error', 409, 'email already in use', true)
      )

    const { data: user } = await users.add(
      displayName,
      age,
      email,
      password,
      organisation_id,
      is_organisation,
      department_id
    )

    const token = createAccessToken(user.uid)

    res.send(token)
  } catch (error) {
    next(new AppError('Internal server error', 500, error.message, false))
  }
}

module.exports = auth
