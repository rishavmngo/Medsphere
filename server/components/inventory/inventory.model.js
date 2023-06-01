const inventory = {}
const db = require('../../db/db')
const AppError = require('../../utils/AppError')

inventory.getMedicinebyOrgId = async (orgId) => {
  const response = {}
  const query = {
    text: 'select * from medicine where org_id=$1',
    values: [orgId],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

inventory.getMedicineBySubstring = async (orgId, substring) => {
  const response = {}
  const query = {
    text: 'select * from medicine where  (lower(brand_name) like $1 or lower(generic) like $1);',
    values: [`%${substring.toLowerCase()}%`],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

inventory.addMedicine = async (orgId, body) => {
  const response = {}
  const { brand_name, type, generic, dosageform, manufacturer, quantity } = body
  const query = {
    text: 'Insert into medicine(brand_name,type,generic,dosageform,manufacturer,quantity,org_id) values($2,$3,$4,$5,$6,$7,$1) returning *',
    values: [
      orgId,
      brand_name,
      type,
      generic,
      dosageform,
      manufacturer,
      parseInt(quantity),
    ],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

inventory.updateMedicine = async (id, orgId, body) => {
  const { brand_name, type, generic, dosageform, manufacturer, quantity } = body
  const response = {}
  const query = {
    text: 'Update  medicine set brand_name = $3,type = $4,generic = $5,dosageform = $6,manufacturer = $7 ,quantity=$8 where id=$1 and org_id = $2 returning *',
    values: [
      id,
      orgId,
      brand_name,
      type,
      generic,
      dosageform,
      manufacturer,
      quantity,
    ],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

inventory.deleteMedicine = async (id, orgId) => {
  const response = {}
  const query = {
    text: 'Delete from medicine where id=$1 and org_id=$2 returning *',
    values: [id, orgId],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}
module.exports = inventory
