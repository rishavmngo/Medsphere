import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage'

export const AppointmentContext = createContext({
  appointments: [],
  getAllAppointmentsByDate: () => null,
})

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([])

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

  const values = {
    appointments,
    getAllAppointmentsByDate,
  }

  return (
    <AppointmentContext.Provider value={values}>
      {children}
    </AppointmentContext.Provider>
  )
}

export default AppointmentProvider
