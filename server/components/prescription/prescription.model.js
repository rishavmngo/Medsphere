const prescription = {}
const db = require('../../db/db')
const AppError = require('../../utils/AppError')

prescription.create = async (appointmentId) => {
  const response = {}
  const query = {
    text: 'Insert into prescription(appointment_id) values($1) returning *',
    values: [appointmentId],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

prescription.getById = async (prescriptionId) => {
  const response = {}
  const query = {
    text: `select
	p.id as id,
	a.id as appointment_id,
	a."timestamp" as timestamp,
	p2.id as patients_id,
	p2.name as patients_name,
	p2.age as patients_age,
	p2.gender as patients_gender,
	d.uid as doctors_id,
	d.displayname as doctors_name,
	d.qualifications as doctors_qualifications,
	department.name as doctors_department,
	org.displayname as organisation_name,
	org.email as organisation_email,
	org.address as organisation_address,
	org.phone_number as organisation_phone_number
from
	prescription p
left join appointments a on
	a.id = p.appointment_id
left join patients p2 on
	a.patients_id = p2.id
left join users d on
	d.uid = a.doctors_id
left join users org on
	org.uid = a.org_id
join department on d.department_id = department.id
where
	d.is_organisation = false
	and p.id = $1;`,
    values: [prescriptionId],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

prescription.getByAppointmentId = async (appointmentId) => {
  const response = {}
  const query = {
    text: 'SELECT * from prescription where appointment_id = $1',
    values: [appointmentId],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}
module.exports = prescription