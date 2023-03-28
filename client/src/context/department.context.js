import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

export const DepartmentContext = createContext({
  getAllDepartmentForOrg: () => null,
  department: [],
  addDepartment: () => null,
  updateDepartment: () => null,
  deleteDepartment: () => null,
})

const DepartmentProvider = ({ children }) => {
  const [department, setDepartment] = useState([])

  const getAllDepartmentForOrg = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        'http://localhost:3000/department/getAll',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      if (!data) return []
      if (data.length !== department.length) setDepartment(data)
      else if (data.length > 0) setDepartment(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addDepartment = async ({ name }) => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.post(
        'http://localhost:3000/department/add',
        {
          name,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )

      await getAllDepartmentForOrg()
    } catch (error) {
      console.error(error)
    }
  }

  const updateDepartment = async ({ id, name }) => {
    try {
      const { data } = await axios.put(
        'http://localhost:3000/department/update',
        {
          id,
          name,
        }
      )

      await getAllDepartmentForOrg()
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const deleteDepartment = async ({ id }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/department/delete/${id}`
      )

      await getAllDepartmentForOrg()
    } catch (error) {
      console.error(error.response.data)
    }
  }
  const values = {
    department,
    getAllDepartmentForOrg,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  }
  return (
    <DepartmentContext.Provider value={values}>
      {children}
    </DepartmentContext.Provider>
  )
}

export default DepartmentProvider
