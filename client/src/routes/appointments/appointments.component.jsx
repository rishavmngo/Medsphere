import { useState } from 'react'
import { Calendar } from 'react-calendar'
import AppointmentEntity from '../../component/appointmentEntity/appointmentEntity.component'
import AppointmentFilter from '../../component/appointmentFilter/appointmentFilter.component'
import { changeDateToIsoFormat } from '../../utils/dates.utils'
import './appointments.style.css'
const Appointments = () => {
  return (
    <div>
      <AppointmentFilter />
      <div className='calender-btn'></div>
      <AppointmentEntity />
    </div>
  )
}

export default Appointments
