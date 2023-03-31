import { useContext, useEffect, useState } from 'react'
import { AppointmentContext } from '../../context/appointments.context'
import { AuthContext } from '../../context/auth.context'
import ManageTable from '../manageTable/manageTable.component'
import './appointmentList.style.css'

const AppointmentList = ({ date }) => {
  const {
    getAllAppointmentsByDate,
    appointments,
    getByDoctorAndDate,
    appointmentsMap,
  } = useContext(AppointmentContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) return
    if (user.is_organisation) getAllAppointmentsByDate(date)
    else {
      getByDoctorAndDate(date)
    }
  }, [date, user])

  return (
    <div>
      <ManageTable
        body={appointmentsMap}
        columns={['Appointments no.', 'Patient Name', 'Age', 'Doctors Name']}
        bodyData={[
          'appointment_number',
          'patients_name',
          'age',
          'doctors_name',
        ]}
      />
    </div>
  )
}

export default AppointmentList
