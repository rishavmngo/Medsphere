import { useState } from 'react'
import AppointmentFilter from '../../component/appointmentFilter/appointmentFilter.component'
import AppointmentList from '../../component/appointmentList/appointmentList.component'
import { changeDateToIsoFormat } from '../../utils/dates.utils'
import './appointments.style.css'
const Appointments = () => {
  const [date, setDate] = useState(changeDateToIsoFormat(new Date()))
  return (
    <div>
      <AppointmentFilter date={date} setDate={setDate} />
      <div className='calender-btn'></div>
      <AppointmentList date={date} />
    </div>
  )
}

export default Appointments
