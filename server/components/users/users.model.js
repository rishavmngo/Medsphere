const db = require('../../db/db.js')
const AppError = require('../../utils/AppError')

const users = {}

users.add = async (
  displayName,
  age,
  email,
  password,
  organisation_id,
  is_organisation,
  department_id
) => {
  const response = {}
  try {
    const query = `INSERT INTO users(displayName,email,password,organisation_id,is_organisation,department_id,age) values($1,$2,$3,$4,$5,$6,$7) returning *`

    const { rows } = await db.query(query, [
      displayName,
      email,
      password,
      organisation_id,
      is_organisation,
      department_id,
      age,
    ])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.getByEmail = async (email) => {
  const response = {}
  try {
    const query = `SELECT * FROM users WHERE email=$1`

    const { rows } = await db.query(query, [email])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.getById = async (uid) => {
  const response = {}
  try {
    const query = `SELECT * FROM users WHERE uid=$1`

    const { rows } = await db.query(query, [uid])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.exists = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email=$1`

    const { rows } = await db.query(query, [email])
    if (rows.length < 1) return false
    return true
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.getAllDoctors = async (uid) => {
  const response = {}
  try {
    const query = `select uid,displayname, email,age, d.name as department, is_organisation , organisation_id  from  users 
left join department d 
on d.id = users.department_id where organisation_id = $1`

    const { rows } = await db.query(query, [uid])

    response.data = rows

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

module.exports = users