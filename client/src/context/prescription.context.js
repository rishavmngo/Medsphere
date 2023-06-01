import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

const defaultConfig = {
  prescription_background: 'white',
  prescription_primary_color: 'crimson',
}
export const PrescriptionContext = createContext({
  currentPrescription: {},
  orgConfigration: {},
  getPrescrcriptionById: () => null,
  createPrescription: () => null,
  getPrescribedMedicine: () => null,
  prescribedMedicine: [],
  getPrescribedMedicineBySubstring: () => null,
  addPrescriptionMedicine: () => null,
  prescribedAdvice: [],
  getPrescribedAdvice: () => null,
  addPrescribedAdvice: () => null,
  deletePrescribedAdvice: () => null,
  fetchOrgConfigration: () => null,
  updateOrgConfigration: () => null,
})

const PrescriptionProvider = ({ children }) => {
  const [currentPrescription, setCurrentPrescription] = useState({})
  const [prescribedMedicine, setPrescribedMedicine] = useState([])
  const [prescribedAdvice, setPrescribedAdvice] = useState([])
  const [orgConfigration, setOrgConfigration] = useState({})

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
        `http://localhost:3000/prescription/medicine/getAll/${byPrescriptionId}`,
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

  const getPrescribedMedicineBySubstring = async (substring) => {
    if (substring.length <= 0) return []
    // return []
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        `http://localhost:3000/inventory/medicine/has/${substring}`,
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

  const addPrescriptionMedicine = async (medToAdd, byPrescriptionId) => {
    // console.log(medToAdd, byPrescriptionId)
    const duration = medToAdd.duration + ' ' + medToAdd.durationUnit
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        `http://localhost:3000/prescription/medicine/add/${byPrescriptionId}`,
        {
          medicine_id: medToAdd.id,
          dosage: medToAdd.dosage,
          duration: duration,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getPrescribedMedicine(byPrescriptionId)
      // setPrescribedMedicine(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getPrescribedAdvice = async (byPrescriptionId) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        `http://localhost:3000/prescription/advice/getAll/${byPrescriptionId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      setPrescribedAdvice(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addPrescribedAdvice = async (prescriptionId, advice) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        `http://localhost:3000/prescription/advice/add/${prescriptionId}`,
        {
          advice: advice,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getPrescribedAdvice(prescriptionId)
    } catch (error) {
      console.error(error)
    }
  }
  const deletePrescribedAdvice = async (
    prescriptionAdviceId,
    prescriptionId
  ) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/prescription/advice/delete/${prescriptionAdviceId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getPrescribedAdvice(prescriptionId)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchOrgConfigration = async (orgId) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        `http://localhost:3000/prescription/configration/get/${orgId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      setOrgConfigration(JSON.parse(data.config))
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const updateOrgConfigration = async (orgId, configJson) => {
    if (Object.keys(configJson) < 1) return false
    const config = JSON.stringify(configJson)
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.put(
        `http://localhost:3000/prescription/configration/update/${orgId}`,
        {
          config: config,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await fetchOrgConfigration(orgId)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  useEffect(() => {
    console.log('org', orgConfigration)
  }, [orgConfigration])

  const values = {
    getPrescrcriptionById,
    currentPrescription,
    createPrescription,
    getPrescribedMedicine,
    prescribedMedicine,
    getPrescribedMedicineBySubstring,
    addPrescriptionMedicine,
    getPrescribedAdvice,
    prescribedAdvice,
    addPrescribedAdvice,
    deletePrescribedAdvice,
    orgConfigration,
    fetchOrgConfigration,
    updateOrgConfigration,
  }

  return (
    <PrescriptionContext.Provider value={values}>
      {children}
    </PrescriptionContext.Provider>
  )
}

export default PrescriptionProvider
