const db = require('../../db/db.js')
const AppError = require('../../utils/AppError')

const department = {}

department.getAll = async (id) => {
  const query = 'select * from department where org_id=$1'
  const response = {}

  try {
    const { rows } = await db.query(query, [id])
    response.data = rows
    return response
  } catch (error) {
    throw new AppError('Database Error', 500, error.message, false)
  }
}

department.add = async (name, id) => {
  const query = 'insert into department(name,org_id) values($1,$2) returning *'
  const response = {}

  try {
    const { rows } = await db.query(query, [name, id])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 500, error.message, false)
  }
}

department.update = async (name, id) => {
  const query = 'UPDATE department set name=$1 WHERE id=$2 RETURNING *'
  const response = {}

  try {
    const { rows } = await db.query(query, [name, id])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 500, error.message, false)
  }
}
department.delete = async (id) => {
  const query = 'DELETE FROM department WHERE id=$1 returning * '
  const response = {}

  try {
    const { rows } = await db.query(query, [id])
    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 500, error.message, false)
  }
}
module.exports = department
