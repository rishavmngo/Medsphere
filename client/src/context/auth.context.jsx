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
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const getUserAndSetUser = async (token) => {
    try {
      const user = await getUserViaToken(token)

      console.log(user)
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
    } catch (error) {
      console.log(error)
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
    registerOrganisation,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
