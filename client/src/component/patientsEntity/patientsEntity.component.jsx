import PatientsList from '../patientsList/patientsList.component'
import { FaUserPlus } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import ButtonPrime from '../primary_btn/primary_btn.component'
import InputField from '../inputField/inputField.component'
import LeftSlideBar from '../leftSlideBar/leftSlideBar.component'

const defaultFormField = {
  displayName: '',
  age: null,
  email: '',
  password: '',
  confirmPassword: '',
}
const PatientsEntity = () => {
  const patientsSliderRef = useRef()
  const [patientsSlider, setPatientsSlider] = useState(false)
  const [formField, setFormField] = useState(defaultFormField)
  function handlePatientsSlide() {
    setPatientsSlider(true)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const isAddPatientsBtn = event.target.classList.contains('addManager-btn')
      if (
        patientsSliderRef.current &&
        !isAddPatientsBtn &&
        !patientsSliderRef.current.contains(event.target)
      ) {
        setPatientsSlider(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [patientsSliderRef])

  const handleSubmit = () => {}

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormField({ ...formField, [name]: value })
  }
  return (
    <div>
      <PatientsList />

      <button className='addManager-btn' onClick={() => handlePatientsSlide()}>
        <span className='addManager-btn-icon'>
          <FaUserPlus />
        </span>
        <span className='addManger-btn-label' onClick={handlePatientsSlide}>
          Add Patients
        </span>
      </button>

      <LeftSlideBar open={patientsSlider} innerRef={patientsSliderRef}>
        <div className='ManageSlidebar-container'>
          <InputField
            label='Disaplay Name'
            name='displayName'
            onChange={handleChange}
          />

          <InputField label='Age' name='age' onChange={handleChange} />
          <InputField label='Email' name='email' onChange={handleChange} />
          <InputField
            label='Password'
            name='password'
            onChange={handleChange}
          />
          <InputField
            label='Confirm password'
            name='confirmPassword'
            onChange={handleChange}
          />

          <div className='buttons-container'>
            <ButtonPrime text='add' onClick={handleSubmit} />
          </div>
        </div>
      </LeftSlideBar>
    </div>
  )
}

export default PatientsEntity
