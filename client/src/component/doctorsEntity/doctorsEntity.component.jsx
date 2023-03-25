import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { FaUserPlus } from 'react-icons/fa'
import InputField from '../inputField/inputField.component'
import DoctorsList from '../doctorsList/doctorsList.component'
import LeftSlideBar from '../leftSlideBar/leftSlideBar.component'
import Dropdown from '../dropdown/dropdown.componet'
import ButtonPrime from '../primary_btn/primary_btn.component'

const defaultFormField = {
  displayName: '',
  age: null,
  email: '',
  password: '',
  confirmPassword: '',
}
const DoctorsEntity = () => {
  const doctorSliderRef = useRef()

  const [formField, setFormField] = useState(defaultFormField)

  const { registerDoctor, getDepartment } = useContext(AuthContext)

  const [department, setDepartment] = useState([])
  const [currentDepartment, setCurrentDepartment] = useState({
    value: '',
    id: null,
  })

  const [doctorsSlider, setDoctorsSlider] = useState(false)

  function handleDoctorSlider() {
    setDoctorsSlider(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormField({ ...formField, [name]: value })
  }

  const handleSubmit = () => {
    registerDoctor({
      ...formField,
      department_id: parseInt(currentDepartment.id),
    })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const isAddDoctorsBtn = event.target.classList.contains('addManager-btn')
      if (
        doctorSliderRef.current &&
        !isAddDoctorsBtn &&
        !doctorSliderRef.current.contains(event.target)
      ) {
        setDoctorsSlider(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [doctorSliderRef])

  useEffect(() => {
    async function fetchDepartment() {
      const data = await getDepartment()
      setDepartment(data)
      setCurrentDepartment({ value: data[0].name, id: data[0].id })
    }
    fetchDepartment()
  }, [])

  return (
    <div>
      <DoctorsList />
      <button className='addManager-btn' onClick={() => handleDoctorSlider()}>
        <span className='addManager-btn-icon'>
          <FaUserPlus />
        </span>
        <span className='addManger-btn-label'>Add Doctors</span>
      </button>
      <LeftSlideBar open={doctorsSlider} innerRef={doctorSliderRef}>
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

          <Dropdown
            values={department}
            currentItem={currentDepartment}
            setCurrentItem={setCurrentDepartment}
          />

          <div className='buttons-container'>
            <ButtonPrime text='add' onClick={handleSubmit} />
          </div>
        </div>
      </LeftSlideBar>
    </div>
  )
}

export default DoctorsEntity
