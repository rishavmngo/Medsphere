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
  age: null,
  email: '',
  password: '',
  confirmPassword: '',
}
const Manage = () => {
  const manageCompRef = useRef()
  const [formField, setFormField] = useState(defaultFormField)
  const { registerDoctor, getDepartment } = useContext(AuthContext)
  const [somethingSlidebar, setSomethingSlidebar] = useState(false)
  const [department, setDepartment] = useState([])
  const [currentDepartment, setCurrentDepartment] = useState({
    value: '',
    id: null,
  })

  const entity = [
    { id: 0, name: 'Doctors' },
    { id: 1, name: 'Patients' },
  ]
  const [entities, setEntities] = useState(entity)

  const [currentEntity, setCurrentEntity] = useState({
    value: entities[0].name,
    id: entities[0].id,
  })

  useEffect(() => {
    async function fetchDepartment() {
      const data = await getDepartment()
      setDepartment(data)
      setCurrentDepartment({ value: data[0].name, id: data[0].id })
    }
    fetchDepartment()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      const isAddPatientBtn = event.target.classList.contains('addManager-btn')
      if (
        manageCompRef.current &&
        !isAddPatientBtn &&
        !manageCompRef.current.contains(event.target)
      ) {
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
    registerDoctor({
      ...formField,
      department_id: parseInt(currentDepartment.id),
    })
  }
  return (
    <div className='manage-container'>
      <Dropdown
        values={entities}
        currentItem={currentEntity}
        setCurrentItem={setCurrentEntity}
        maxWidth={'70px'}
        minWidth={'70px'}
      />

      {currentEntity.id === 0 && (
        <div>
          <DoctorsList />
          <button className='addManager-btn' onClick={() => handleSlider()}>
            <span className='addManager-btn-icon'>
              <FaUserPlus />
            </span>
            <span className='addManger-btn-label'>Add Doctors</span>
          </button>
          <LeftSlideBar open={somethingSlidebar} innerRef={manageCompRef}>
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
      )}

      {currentEntity.id === 1 && (
        <div>
          <button className='addManager-btn' onClick={() => handleSlider()}>
            <span className='addManager-btn-icon'>
              <FaUserPlus />
            </span>
            <span className='addManger-btn-label'>Add Patients</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Manage
