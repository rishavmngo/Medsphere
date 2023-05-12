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
  p2.address as patients_address,
  p2.blood_group as patients_blood_group,
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

prescription.addMedicineToPrescription = async (
  prescriptionId,
  medicine_id,
  dosage,
  duration
) => {
  const response = {}
  const query = {
    text: `
insert
	into
	prescribed_medicine(prescription_id,
	medicine_id,
	dosage,
	duration)
values($1,
$2,
$3,
$4) returning *
		`,
    values: [prescriptionId, medicine_id, dosage, duration],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows[0]

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

// prescription.getPrescribedMedicine = async (prescriptionId) => {
//   const response = {}
//   const query = {
//     text: `
// select
// 	pm.id as prescribed_medicine_id,
// 	m.brand_name as medicine_name,
// 	m.dosageform as dosageform,
// 	m.generic as generic_name ,
// 	pm.dosage as dosage,
// 	pm.duration as duration
// from
// 	prescribed_medicine pm
// left join medicine m on
// 	pm.medicine_id = m.id
// where
// 	pm.prescription_id = $1
// 		`,
//     values: [prescriptionId],
//   }
//   try {
//     const { rows } = await db.query(query)
//     response.data = rows
//
//     return response
//   } catch (error) {
//     throw new AppError('Database Error', 502, error.message, false)
//   }
// }
//
prescription.updatePrescribedMedicine = async (
  prescriptionMedicineId,
  prescriptionId,
  medicine_id,
  dosage,
  duration
) => {
  const response = {}
  const query = {
    text: `
update
	prescribed_medicine
set
	prescription_id = $2,
	medicine_id = $3,
	dosage = $4,
	duration = $5 
where
	id = $1
returning *
		`,
    values: [
      prescriptionMedicineId,
      prescriptionId,
      medicine_id,
      dosage,
      duration,
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

prescription.getPrescribedMedicine = async (prescriptionId) => {
  const response = {}
  const query = {
    text: `
select
	pm.id as prescribed_medicine_id,
	m.brand_name as medicine_name,
	m.dosageform as dosageform,
	m.generic as generic_name ,
	pm.dosage as dosage,
	pm.duration as duration
from
	prescribed_medicine pm
left join medicine m on
	pm.medicine_id = m.id
where
	pm.prescription_id = $1 
		`,
    values: [prescriptionId],
  }
  try {
    const { rows } = await db.query(query)
    response.data = rows

    return response
  } catch (error) {
    throw new AppError('Database Error', 502, error.message, false)
  }
}

prescription.deletePrescriptionById = async (id) => {
  const response = {}
  const query = {
    text: `
    delete from prescribed_medicine where id = $1 returning *
		`,
    values: [id],
  }
  try {
    const { rows } = await db.query(query)
    if (rows.length <= 0) {
      response.error = {
        statusCode: 204,
        message: "Entity does't exists",
      }
    }

    response.data = rows[0]

    return response
  } catch (error) {
    if (error.statusCode === 204)
      throw new AppError('Database Error', 502, error.message, false)
  }
}
module.exports = prescription
