import PatientsList from '../patientsList/patientsList.component'
import { FaUserPlus } from 'react-icons/fa'
import { useContext, useEffect, useRef, useState } from 'react'
import ButtonPrime from '../primary_btn/primary_btn.component'
import InputField from '../inputField/inputField.component'
import LeftSlideBar from '../leftSlideBar/leftSlideBar.component'
import Dropdown from '../dropdown/dropdown.componet'
import './patientsEntity.style.css'
import { PatientsContext } from '../../context/patients.context'

const defaultFormField = {
  name: '',
  age: null,
}
const PatientsEntity = () => {
  const patientsSliderRef = useRef()
  const [patientsSlider, setPatientsSlider] = useState(false)
  const [formField, setFormField] = useState(defaultFormField)
  const gender = [
    { id: 0, name: 'male' },
    { id: 1, name: 'female' },
    { id: 2, name: 'others' },
  ]

  const [genders, setGenders] = useState(gender)
  const { addPatients } = useContext(PatientsContext)
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

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormField({ ...formField, [name]: value })
  }

  const [currentGender, setCurrentGender] = useState({
    value: genders[0].name,
    id: genders[0].id,
  })

  const handleSubmit = () => {
    addPatients({ ...formField, gender: currentGender.value })
    setFormField(defaultFormField)
    setPatientsSlider(false)
  }
  return (
    <div className='entityContainer'>
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
        <div className='ManageSlidebar-container patientsSliderContainer'>
          <InputField
            label='Disaplay Name'
            name='name'
            onChange={handleChange}
          />

          <InputField label='Age' name='age' onChange={handleChange} />
          <Dropdown
            values={genders}
            currentItem={currentGender}
            setCurrentItem={setCurrentGender}
            maxWidth={'0px'}
            minWidth={'0px'}
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
