import axios from 'axios'
import { createContext, useState } from 'react'
import {
  deleteTokenFromLocalStorage,
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from '../utils/localstorage.js'

export const AuthContext = createContext({
  user: null,
  setUser: () => null,
  login: () => null,
  autoLogin: () => null,
  logout: () => null,
  doctors: [],
  setDoctors: () => null,
  registerDoctor: () => null,
  registerOrganisation: () => null,
  fetchDoctorsForOrg: () => null,
  getDepartment: () => null,
  department: [],
  departmentMap: {},
  getPatientsForOrg: () => null,
  patients: [],
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [department, setDepartment] = useState([])
  const [departmentMap, setDepartmentMap] = useState({})
  const [patients, setPatients] = useState([])

  const makeDepartmentMap = () => {
    const map = {}
    department.map((i) => {
      map[i.id] = i
    })
    setDepartmentMap(map)
  }

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

  const getDepartment = async () => {
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

      return data
    } catch (error) {
      console.error(error)
    }
  }

  const getUserAndSetUser = async (token) => {
    try {
      const user = await getUserViaToken(token)

      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (email, password) => {
    setDoctors([])
    try {
      const { data: token } = await axios.post(
        'http://localhost:3000/auth/login',
        {
          email,
          password,
        }
      )
      await getUserAndSetUser(token)

      saveTokenToLocalStorage(token)
    } catch (error) {
      console.log(error)
    }
  }

  const autoLogin = async () => {
    setDoctors([])
    const token = getTokenFromLocalStorage()
    if (!token) return

    try {
      await getUserAndSetUser(token)
    } catch (error) {
      console.log(error)
    }
  }

  async function getUserViaToken(token) {
    try {
      const { data: user } = await axios.get(
        'http://localhost:3000/users/get',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async function registerOrganisation({ email, displayName, password }) {
    try {
      const { data: token } = await axios.post(
        'http://localhost:3000/auth/register',
        {
          email,
          displayName,
          password,
          is_organisation: true,
        }
      )
      await getUserAndSetUser(token)
      saveTokenToLocalStorage(token)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchDoctorsForOrg() {
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
  }) {
    try {
      const { data: token } = await axios.post(
        'http://localhost:3000/auth/register',
        {
          email,
          displayName,
          age,
          password,
          is_organisation: false,
          organisation_id: user.uid,
          department_id,
        }
      )
      // const doctor = await getUserViaToken(token)
      await fetchDoctorsForOrg()
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    deleteTokenFromLocalStorage()
    setUser(null)
  }

  const values = {
    login,
    autoLogin,
    logout,
    user,
    setUser,
    doctors,
    registerOrganisation,
    fetchDoctorsForOrg,
    registerDoctor,
    setDoctors,
    getDepartment,
    department,
    departmentMap,
    patients,
    getPatientsForOrg,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
