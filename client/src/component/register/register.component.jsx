import InputField from '../inputField/inputField.component'
import ButtonPrime from '../primary_btn/primary_btn.component'
import './register.styles.css'

const Register = ({ setIsLogin }) => {
  const goToLoginPage = () => {}
  return (
    <div className='Register-Container'>
      <div className='inputs'>
        <InputField label='name' type='text' />
        <InputField label='email' type='email' />
        <InputField label='password' type='password' />
        <InputField label='confirm password' type='password' />
      </div>
      <div className='buttons'>
        <ButtonPrime text='Register' className='Register-btn' />
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
