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
  registerOrganisation: () => null,
  getDepartment: () => null,
  uploadProfilePicture: () => null,
  updateOrganisation: () => null,
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const getUserAndSetUser = async (token) => {
    try {
      const user = await getUserViaToken(token)

      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (email, password) => {
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
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const autoLogin = async () => {
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
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function updateOrganisation({
    email,
    name,
    password,
    address,
    phoneNumber,
  }) {
    const token = getTokenFromLocalStorage()
    if (!token) return
    try {
      const { data } = await axios.put(
        'http://localhost:3000/users/update',
        {
          email,
          displayname: name,
          password,
          address,
          phone_number: phoneNumber,
        },

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      autoLogin()
    } catch (error) {
      console.log(error)
    }
  }
  const logout = () => {
    deleteTokenFromLocalStorage()
    setUser(null)
  }
  const uploadProfilePicture = async (image) => {
    const token = getTokenFromLocalStorage()
    const formData = new FormData()
    formData.append('image', image)

    try {
      const { data } = await axios.post(
        'http://localhost:3000/upload/org/profile/icon',
        formData,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (data) setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  const values = {
    login,
    autoLogin,
    logout,
    user,
    setUser,
    registerOrganisation,
    uploadProfilePicture,
    updateOrganisation,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
