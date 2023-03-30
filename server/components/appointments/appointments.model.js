const db = require('../../db/db.js')
const AppError = require('../../utils/AppError.js')
const appointments = {}

appointments.add = async (patients_id, doctors_id, org_id) => {
  const response = {}
  const query = `INSERT INTO appointments(patients_id,doctors_id,timestamp,org_id) VALUES($1,$2,now(),$3) returning *`

  try {
    const { rows } = await db.query(query, [patients_id, doctors_id, org_id])

    response.data = rows[0]
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}
appointments.getAll = async (org_id) => {
  const response = {}
  const query = `select
	appointments.id,
	patients.name as patients_name,
	patients.age,
	users.displayname as doctors_name,
	appointments."timestamp"
from
	appointments
left join users on
	appointments.doctors_id = users.uid
left join patients on
	appointments.patients_id = patients.id
	where appointments.id in
(select appointments.id as doctors_id  from appointments where org_id = $1)`

  try {
    const { rows } = await db.query(query, [org_id])

    response.data = rows
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}
//
appointments.getAllByDate = async (org_id, date) => {
  const response = {}
  const query = `select
	appointments.id,
	patients.name as patients_name,
	patients.age,
	users.displayname as doctors_name,
	appointments."timestamp"
from
	appointments
left join users on
	appointments.doctors_id = users.uid
left join patients on
	appointments.patients_id = patients.id
where
	date(appointments."timestamp") = $2
	and appointments.id in
(
	select
		appointments.id as doctors_id
	from
		appointments
	where
		org_id = $1)`

  try {
    const { rows } = await db.query(query, [org_id, date])

    response.data = rows
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

appointments.getByDoctor = async (org_id, doctors_id) => {
  const response = {}
  const query = `select
	appointments.id,
	patients.name as patients_name,
	patients.age,
	users.displayname as doctors_name,
	appointments."timestamp"
from
	appointments
left join users on
	appointments.doctors_id = users.uid
left join patients on
	appointments.patients_id = patients.id
where
	users.uid = $2
	and appointments.id in
(
	select
		appointments.id as doctors_id
	from
		appointments
	where
		org_id = $1)`

  try {
    const { rows } = await db.query(query, [org_id, doctors_id])

    response.data = rows
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

appointments.getByDoctorAndDate = async (org_id, doctors_id, date) => {
  const response = {}
  const query = `select
	appointments.id,
	patients.name as patients_name,
	patients.age,
	users.displayname as doctors_name,
	appointments."timestamp"
from
	appointments
left join users on
	appointments.doctors_id = users.uid
left join patients on
	appointments.patients_id = patients.id
where
	users.uid = $2
	and
	date(appointments."timestamp") = $3
	and appointments.id in
(
	select
		appointments.id as doctors_id
	from
		appointments
	where
		org_id = $1)`

  try {
    const { rows } = await db.query(query, [org_id, doctors_id, date])

    response.data = rows
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

// appointments.getByUser = async () => {}
//
// appointments.getByUserAndDate = async () => {}

module.exports = appointments
