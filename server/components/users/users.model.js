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
    const query = `select uid,displayname, email,password,age, d.name as department, is_organisation , organisation_id,users.address,users.phone_number,users.qualifications  from  users 
left join department d 
on d.id = users.department_id where organisation_id = $1`

    const { rows } = await db.query(query, [uid])

    response.data = rows
    console.log(rows[0])

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.getBySubstring = async (substring, uid) => {
  const response = {}

  const query = {
    text: 'select uid,displayname,email,department.name as departmentname,organisation_id  from users left join department on users.department_id = department.id where users.is_organisation  = false and users.organisation_id = $2 and (lower(displayname) like $1 or lower(department."name")like $1);',
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
users.updateOne = async (uid, name, address, phone_number, password, email) => {
  const response = {}

  // console.log(uid, name, address, phone_number, password, email)

  const query = {
    text: `UPDATE users 
           set displayname = $2,
					  address = $3,
            phone_number=$4,
            password = $5,
            email = $6
		       where uid=$1
		returning *`,
    values: [uid, name, address, phone_number, password, email],
  }
  try {
    const { rows } = await db.query(query)

    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.deleteById = async (uid) => {
  const response = {}

  const query = {
    text: `
	DELETE
	from
	users
	where uid=$1
	returning *`,
    values: [uid],
  }
  console.log(query)
  try {
    const { rows } = await db.query(query)

    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.getDoctorById = async (orgId, doctorId) => {
  const response = {}
  try {
    const query = `SELECT * FROM users WHERE organisation_id=$1 and uid=$2`

    const { rows } = await db.query(query, [orgId, doctorId])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

users.updateDoctorOne = async (orgId, doctorId, modifiedDoctor) => {
  const {
    displayname,
    age,
    address,
    email,
    qualifications,
    phone_number,
    password,
  } = modifiedDoctor
  const response = {}
  try {
    const query = `UPDATE users set displayname=$1, age=$2, address=$3,email=$4,qualifications=$5,phone_number=$6,password=$7 where uid=$8 and organisation_id=$9 returning *`

    const { rows } = await db.query(query, [
      displayname,
      age,
      address,
      email,
      qualifications,
      phone_number,
      password,
      doctorId,
      orgId,
    ])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}
module.exports = users
