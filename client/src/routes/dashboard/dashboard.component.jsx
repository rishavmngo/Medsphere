import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import { AppointmentContext } from '../../context/appointments.context.jsx'
import './dashboard.style.css'
const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [appointmentCount, setAppointmentCount] = useState('0')
  const {
    getOrgAppointmentsCountForToday,
    getDoctorsAppointmentsCountForToday,
  } = useContext(AppointmentContext)
  useEffect(() => {
    async function fetchForOrg() {
      try {
        const data = await getOrgAppointmentsCountForToday()
        if (parseInt(data.appointments) < 10)
          data.appointments = '0' + data.appointments
        setAppointmentCount(data.appointments)
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchForDoctors() {
      try {
        const data = await getDoctorsAppointmentsCountForToday(
          user.uid,
          user.organisation_id
        )
        if (parseInt(data.appointments) < 10)
          data.appointments = '0' + data.appointments
        setAppointmentCount(data.appointments)
      } catch (error) {
        console.error(error)
      }
    }
    user.is_organisation ? fetchForOrg() : fetchForDoctors()
  }, [user])

  return (
    <div>
      <div className='welcome-msg'>
        <span>Welcome </span>
        <span className='welcome-msg__entity-name'>
          {!user.is_organisation ? 'Dr. ' : ''}
          {user.displayname}
        </span>
      </div>
      <div className='appointment-widget'>
        You have{' '}
        <span className='appointment-widget-count'>{appointmentCount}</span>{' '}
        appointments today
      </div>
    </div>
  )
}

export default Dashboard
