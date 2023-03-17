import { useContext, useState } from 'react'
import './signin.styles.css'
import InputField from '../inputField/inputField.component'
import ButtonPrime from '../primary_btn/primary_btn.component'
import './signin.styles.css'

const defaultFormFields = {
  email: '',
  password: '',
}

const Login = ({ setIsLogin }) => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  const handleSubmit = (e) => {
    Login(email, password)
    setFormFields(defaultFormFields)
  }

  const goToRegisterPage = () => {
    // toggleLoginPage(false)
  }
  return (
    <div className='Login-Container'>
      <div className='inputs'>
        <InputField
          label='email'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />
        <InputField
          label='password'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className='buttons'>
        <ButtonPrime
          text='login'
          className='Login-btn'
          onClick={handleSubmit}
        />
      </div>
      <div className='register-link'>
        Don't have an account?
        <span
          className='register-link-btn'
          onClick={() => {
            setIsLogin(false)
          }}
        >
          {' '}
          Register
        </span>
      </div>
    </div>
  )
}

export default Login
