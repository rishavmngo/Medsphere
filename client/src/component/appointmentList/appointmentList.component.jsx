import { useContext, useEffect, useState } from 'react'
import { AppointmentContext } from '../../context/appointments.context'
import { AuthContext } from '../../context/auth.context'
import ManageTable from '../manageTable/manageTable.component'
import './appointmentList.style.css'

const AppointmentList = ({ date, currentDropdownItem }) => {
  const {
    getAllAppointmentsByDate,
    appointments,
    getByDoctorAndDate,
    appointmentsMap,
    getByOrgDoctorAndDate,
  } = useContext(AppointmentContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) return
    if (user.is_organisation && !currentDropdownItem) {
      console.log('1')
      getAllAppointmentsByDate(date)
    } else if (!user.is_organisation) {
      console.log('2')
      getByDoctorAndDate(date)
    } else {
      getByOrgDoctorAndDate(date, currentDropdownItem.id)
    }
  }, [date, user, currentDropdownItem])

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
