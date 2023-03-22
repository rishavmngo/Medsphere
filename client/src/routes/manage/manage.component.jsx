import { useContext, useEffect, useState } from 'react'
import DoctorsList from '../../component/doctorsList/doctorsList.component'
import InputField from '../../component/inputField/inputField.component'
import ButtonPrime from '../../component/primary_btn/primary_btn.component'
import { AuthContext } from '../../context/auth.context'
import { StaticCompContext } from '../../context/staticComp.context'
import './manage.styles.css'

const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const Manage = () => {
  const [formField, setFormField] = useState(defaultFormField)
  const { registerDoctor } = useContext(AuthContext)
  const { toggleLeftSlideBar } = useContext(StaticCompContext)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormField({ ...formField, [name]: value })
  }
  const handleSubmit = () => {
    console.log(formField)
    registerDoctor(formField)
  }
  return (
    <div className='manage-container'>
      <InputField label='Email' name='email' onChange={handleChange} />
      <InputField
        label='Disaplay Name'
        name='displayName'
        onChange={handleChange}
      />
      <InputField label='Password' name='password' onChange={handleChange} />
      <InputField
        label='Confirm password'
        name='confirmPassword'
        onChange={handleChange}
      />
      <ButtonPrime text='add' onClick={handleSubmit} />
      <DoctorsList />
      <button onClick={() => toggleLeftSlideBar()}>slidebar</button>
    </div>
  )
}

export default Manage
