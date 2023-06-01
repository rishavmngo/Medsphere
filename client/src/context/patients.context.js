import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

export const PatientsContext = createContext({
  getPatientsForOrg: () => null,
  patients: [],
  addPatients: () => null,
  deleteById: () => null,
  updateById: () => null,
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

  const deleteById = async (patientId) => {
    console.log(patientId)
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/patients/deleteById/${patientId}`,

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getPatientsForOrg()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const updateById = async (patientId, patient) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.put(
        `http://localhost:3000/patients/updateById/${patientId}`,
        patient,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      // console.log('success', data)
      await getPatientsForOrg()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  const values = {
    patients,
    getPatientsForOrg,
    addPatients,
    deleteById,
    updateById,
  }
  return (
    <PatientsContext.Provider value={values}>
      {children}
    </PatientsContext.Provider>
  )
}

export default PatientsProvider
