import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

export const MedicineContext = createContext({
  medicines: [],
  getMedicinesForOrg: () => null,
  addMedicines: () => null,
  updateMedicine: () => null,
  deleteMedicine: () => null,
})

const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([])

  const getMedicinesForOrg = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        'http://localhost:3000/inventory/medicine/byOrgId',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      if (!data) return []
      if (data.length !== medicines.length) setMedicines(data)
      else if (data.length > 0) setMedicines(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addMedicines = async (props) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        'http://localhost:3000/inventory/medicine/add',
        {
          ...props,
        },

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getMedicinesForOrg()
    } catch (error) {
      console.error(error)
    }
  }

  const updateMedicine = async ({ id, ...props }) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.put(
        `http://localhost:3000/inventory/medicine/update/${id}`,
        {
          ...props,
        },

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getMedicinesForOrg()
    } catch (error) {
      console.error(error)
    }
  }
  const deleteMedicine = async (medicineId) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/inventory/medicine/delete/${medicineId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getMedicinesForOrg()
    } catch (error) {
      console.error(error)
    }
  }
  const values = {
    getMedicinesForOrg,
    medicines,
    addMedicines,
    deleteMedicine,
    updateMedicine,
  }
  return (
    <MedicineContext.Provider value={values}>
      {children}
    </MedicineContext.Provider>
  )
}

export default MedicineProvider
