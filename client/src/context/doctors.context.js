import axios from 'axios'
import { createContext, useState } from 'react'
import { getTokenFromLocalStorage } from '../utils/localstorage.js'

export const DoctorsContext = createContext({
  doctors: [],
  getDoctorsForOrg: () => null,
  registerDoctor: () => null,
  deleteDoctorById: () => null,
  uploadSignatureForDoctor: () => null,
})

const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([])

  async function getDoctorsForOrg() {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.get(
        'http://localhost:3000/users/getAllDoctors',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )

      if (data.length !== doctors.length) {
        setDoctors(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function registerDoctor({
    email,
    displayName,
    password,
    department_id,
    age,
    organisation_id,
  }) {
    try {
      const { data } = await axios.post('http://localhost:3000/auth/register', {
        email,
        displayName,
        age,
        password,
        is_organisation: false,
        organisation_id,
        department_id,
      })
      await getDoctorsForOrg()
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteDoctorById(id) {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/users/deleteById/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      await getDoctorsForOrg()

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async function uploadSignatureForDoctor(id, image) {
    const token = getTokenFromLocalStorage()
    const formData = new FormData()
    formData.append('image', image)

    try {
      const { data } = await axios.post(
        `http://localhost:3000/upload/doctor/profile/signature/${id}`,
        formData,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return true
      // if (data) setUser(data)
    } catch (error) {
      return false
      console.log(error)
    }
  }

  const values = {
    doctors,
    getDoctorsForOrg,
    registerDoctor,
    deleteDoctorById,
    uploadSignatureForDoctor,
  }
  return (
    <DoctorsContext.Provider value={values}>{children}</DoctorsContext.Provider>
  )
}
export default DoctorsProvider
