import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
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
  const [error, setError] = useState(null)
  const handleChange = (e) => {
    const { name, value } = e.target
    checkForErrors(name, value)

    setFormFields({ ...formFields, [name]: value })
  }
  const showUnmatchedToastErorr = () => {
    toast.error('Password mismatched', {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }
  const showRegisterSuccess = () => {
    toast.success('Sucess ', {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }
  const showRegisterFail = () => {
    toast.error('Fail', {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }

  const handleSubmit = async () => {
    if (formFields.confirmPassword != formFields.password)
      showUnmatchedToastErorr()
    else {
      const success = await registerOrganisation(formFields)
      if (success) showRegisterSuccess()
      else showRegisterFail()
    }
  }
  const checkForErrors = (name, value) => {
    if (name == 'confirmPassword' && formFields.password != value) {
      setError("password did't match")
    } else if (
      name == 'password' &&
      formFields.confirmPassword.length > 0 &&
      formFields.confirmPassword != value
    ) {
      setError("password did't match")
    } else {
      setError(null)
    }
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
      {error ? <span className='registerError'>{error}</span> : <span> </span>}
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
