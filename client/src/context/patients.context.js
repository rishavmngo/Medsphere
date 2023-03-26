import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

export const PatientsContext = createContext({
  getPatientsForOrg: () => null,
  patients: [],
  addPatients: () => null,
})

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([])

  const getPatientsForOrg = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        'http://localhost:3000/patients/getAll',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      if (!data) return

      if (data.length !== patients.length) setPatients(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addPatients = async ({ name, age, gender }) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        'http://localhost:3000/patients/add',
        {
          name,
          age,
          gender,
        },

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getPatientsForOrg()
    } catch (error) {
      console.error(error)
    }
  }

  const values = {
    patients,
    getPatientsForOrg,
    addPatients,
  }
  return (
    <PatientsContext.Provider value={values}>
      {children}
    </PatientsContext.Provider>
  )
}

export default PatientsProvider
