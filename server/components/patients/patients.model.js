const AppError = require('../../utils/AppError')
const db = require('../../db/db.js')

const patients = {}

patients.getAll = async (uid) => {
  const response = {}
  try {
    const query = `select * from patients where org_id=$1`

    const { rows } = await db.query(query, [uid])

    response.data = rows

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

patients.add = async (name, age, gender, uid) => {
  const response = {}
  try {
    const query = `insert into patients(name,age,gender,org_id) values($1,$2,$3,$4) returning *`

    const { rows } = await db.query(query, [name, age, gender, uid])

    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

patients.getBySubstring = async (substring, uid) => {
  const response = {}

  const query = {
    text: 'select * from patients where org_id=$2 and lower(patients.name) like $1;',
    values: [`%${substring.toLowerCase()}%`, uid],
  }
  try {
    const { rows } = await db.query(query)

    response.data = rows

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}
module.exports = patients
