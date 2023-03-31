import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage'

export const AppointmentContext = createContext({
  appointments: [],
  getAllAppointmentsByDate: () => null,
  getByDoctorAndDate: () => null,
  appointmentsMap: [],
})

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([])
  const [appointmentsMap, setAppointmentsMap] = useState([])

  useEffect(() => {
    const data = appointments.slice()
    data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

    data.forEach((obj, index) => {
      obj.appointment_number = index + 1
    })

    setAppointmentsMap(data)
  }, [appointments])

  const getAllAppointmentsByDate = async (date) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        'http://localhost:3000/appointments/getAllByDate',
        {
          date,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )

      setAppointments(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getByDoctorAndDate = async (date) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        'http://localhost:3000/appointments/getByDoctorAndDate',
        {
          date,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      console.log(data)

      setAppointments(data)
    } catch (error) {
      console.error(error)
    }
  }

  const values = {
    appointments,
    getAllAppointmentsByDate,
    getByDoctorAndDate,
    appointmentsMap,
  }

  return (
    <AppointmentContext.Provider value={values}>
      {children}
    </AppointmentContext.Provider>
  )
}

export default AppointmentProvider
