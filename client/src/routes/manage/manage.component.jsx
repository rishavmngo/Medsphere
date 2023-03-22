import { useContext, useEffect, useRef, useState } from 'react'
import DoctorsList from '../../component/doctorsList/doctorsList.component'
import Dropdown from '../../component/dropdown/dropdown.componet'
import InputField from '../../component/inputField/inputField.component'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import ButtonPrime from '../../component/primary_btn/primary_btn.component'
import { AuthContext } from '../../context/auth.context'
import './manage.styles.css'
import { FaUserPlus } from 'react-icons/fa'

const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const Manage = () => {
  const manageCompRef = useRef()
  const [formField, setFormField] = useState(defaultFormField)
  const { registerDoctor } = useContext(AuthContext)
  const [somethingSlidebar, setSomethingSlidebar] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState(0)
  const [currentEntity, setCurrentEntity] = useState(0)

  const arrays = [
    'department of physics',
    'department of chemistry',
    'department of mathematics',
  ]
  const entity = ['Doctors', 'Patients']

  useEffect(() => {
    function handleClickOutside(event) {
      const isAddPatientBtn = event.target.classList.contains('addManager-btn')
      if (!isAddPatientBtn && !manageCompRef.current.contains(event.target)) {
        setSomethingSlidebar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [manageCompRef])

  function handleSlider() {
    setSomethingSlidebar(true)
  }
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
      <Dropdown
        values={entity}
        currentItem={currentDepartment}
        setCurrentItem={setCurrentDepartment}
        maxWidth={'70px'}
        minWidth={'70px'}
      />
      <DoctorsList />
      <button className='addManager-btn' onClick={() => handleSlider()}>
        <span className='addManager-btn-icon'>
          <FaUserPlus />
        </span>
        <span className='addManger-btn-label'>Add Doctors</span>
      </button>
      <div ref={manageCompRef}>
        <LeftSlideBar open={somethingSlidebar}>
          <div className='ManageSlidebar-container'>
            <InputField
              label='Disaplay Name'
              name='displayName'
              onChange={handleChange}
            />

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
              values={arrays}
              currentItem={currentDepartment}
              setCurrentItem={setCurrentDepartment}
            />
            <div className='buttons-container'>
              <ButtonPrime text='add' onClick={handleSubmit} />
            </div>
          </div>
        </LeftSlideBar>
      </div>
    </div>
  )
}

export default Manage
