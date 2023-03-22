import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import InputField from '../inputField/inputField.component'
import ButtonPrime from '../primary_btn/primary_btn.component'
import './register.styles.css'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = ({ setIsLogin }) => {
  const { registerOrganisation } = useContext(AuthContext)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (e) => {
    registerOrganisation(formFields)
  }
  return (
    <div className='Register-Container'>
      <div className='inputs'>
        <InputField
          label='name'
          name='displayName'
          type='text'
          onChange={handleChange}
        />
        <InputField
          label='email'
          name='email'
          type='email'
          onChange={handleChange}
        />
        <InputField
          label='password'
          name='password'
          type='password'
          onChange={handleChange}
        />
        <InputField
          label='confirm password'
          name='confirmPassword'
          type='password'
          onChange={handleChange}
        />
      </div>
      <div className='buttons'>
        <ButtonPrime
          text='Register'
          onClick={handleSubmit}
          className='Register-btn'
        />
        {/* <LogoBtn text='Register with Google' /> */}
      </div>
      <div className='login-link'>
        Already have an account?
        <span
          className='login-link-btn'
          onClick={() => {
            setIsLogin(true)
          }}
        >
          Login
        </span>
      </div>
    </div>
  )
}

export default Register
