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

users.getBySubstring = async (substring, uid) => {
  const response = {}

  const query1 = {
    text: 'select uid,displayname,department.name as departmentname,age from users left join department on users.department_id  = department.id  where is_organisation=false and LOWER(displayname) like $1 or LOWER(department.name) like $1 and users.organisation_id=$2',
    text1:
      'select displayname,email,department.name,organisation_id  from users left join department on users.department_id = department.id where users.is_organisation  = false and users.organisation_id = $2 and lower(displayname) like $1;',
    values: [`%${substring.toLowerCase()}%`, uid],
  }
  const query = {
    text: 'select displayname,email,department.name as departmentname,organisation_id  from users left join department on users.department_id = department.id where users.is_organisation  = false and users.organisation_id = $2 and (lower(displayname) like $1 or lower(department."name")like $1);',
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
module.exports = users
