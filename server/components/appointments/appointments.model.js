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

appointments.update = async (
  org_id,
  appointmentId,
  doctors_id,
  patients_id
) => {
  console.log(org_id, appointmentId, doctors_id, patients_id)
  const response = {}
  const query = {
    text: `Update appointments set patients_id = $1,doctors_id = $2 ,timestamp=now() where id=$3 and org_id=$4 returning *`,
    values: [patients_id, doctors_id, appointmentId, org_id],
  }

  // console.log(
  //   typeof patients_id,
  //   typeof doctors_id,
  //   typeof appointmentId,
  //   typeof org_id
  // )
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]
    if (rows.length < 1)
      throw new AppError('Databse Error', 502, "Can't able to update", false)
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

appointments.getByOrg = async (org_id, doctors_id) => {
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
appointments.getByDoctorAndDate = async (doctors_id, date) => {
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
	users.uid = $1
	and
	date(appointments."timestamp") = $2

	`

  try {
    const { rows } = await db.query(query, [doctors_id, date])

    console.log(rows)
    response.data = rows
    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

appointments.getByOrgDoctorAndDate = async (org_id, doctors_id, date) => {
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
	users.uid = $1
	and
	date(appointments."timestamp") = $2
	`

  try {
    const { rows } = await db.query(query, [doctors_id, date])

    console.log(rows)
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
