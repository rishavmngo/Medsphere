import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

export const PrescriptionContext = createContext({
  currentPrescription: {},
  getPrescrcriptionById: () => null,
  createPrescription: () => null,
  getPrescribedMedicine: () => null,
  prescribedMedicine: [],
})

const PrescriptionProvider = ({ children }) => {
  const [currentPrescription, setCurrentPrescription] = useState({})
  const [prescribedMedicine, setPrescribedMedicine] = useState([])

  const getPrescrcriptionById = async (prescriptionId) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        `http://localhost:3000/prescription/getByPrescriptionId/${prescriptionId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      setCurrentPrescription(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createPrescription = async (appointmentId) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        'http://localhost:3000/prescription/create',
        {
          appointment_id: appointmentId,
        },

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      return data
    } catch (error) {
      console.error(error)
    }
  }
  const getPrescribedMedicine = async (byPrescriptionId) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        `http://localhost:3000/prescription/prescribedMedicine/getAll/${byPrescriptionId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      setPrescribedMedicine(data)
    } catch (error) {
      console.error(error)
    }
  }

  const values = {
    getPrescrcriptionById,
    currentPrescription,
    createPrescription,
    getPrescribedMedicine,
    prescribedMedicine,
  }
  return (
    <PrescriptionContext.Provider value={values}>
      {children}
    </PrescriptionContext.Provider>
  )
}

export default PrescriptionProvider
