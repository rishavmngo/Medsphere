import { useContext, useEffect, useRef, useState } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { DepartmentContext } from '../../context/department.context'
import DepartmentList from '../departmentList/departmentList.component'
import InputField from '../inputField/inputField.component'
import LeftSlideBar from '../leftSlideBar/leftSlideBar.component'
import Overlay from '../overlay/overlay.component'
import ButtonPrime from '../primary_btn/primary_btn.component'
import './departmentEntity.style.css'

const defaultFormField = {
  name: '',
}

const DepartmentEntity = () => {
  const departmentSliderRef = useRef()
  const departmentUpdateSliderRef = useRef()
  const [departmentSlider, setDepartmentSlider] = useState(false)
  const [departmentUpdateSlider, setDepartmentUpdateSlider] = useState(false)
  const { addDepartment } = useContext(DepartmentContext)
  const [formField, setFormField] = useState(defaultFormField)
  function handleDepartmentSlide() {
    setDepartmentSlider(true)
  }

  function handleDepartmentUpdateSlide() {
    setDepartmentUpdateSlider(true)
  }
  const handleSubmit = () => {
    addDepartment(formField)
    setFormField(defaultFormField)
    setDepartmentSlider(false)
  }

  const handleUpdate = () => {
    console.log(formField)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormField({ ...formField, [name]: value })
  }
  useEffect(() => {
    function handleClickOutside(event) {
      const isAddDepartmentBtn =
        event.target.classList.contains('addManager-btn')
      if (
        departmentSliderRef.current &&
        !isAddDepartmentBtn &&
        !departmentSliderRef.current.contains(event.target)
      ) {
        setDepartmentSlider(false)
      }

      if (
        departmentUpdateSliderRef.current &&
        !departmentUpdateSliderRef.current.contains(event.target)
      ) {
        setDepartmentUpdateSlider(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [departmentSliderRef, departmentUpdateSliderRef])

  return (
    <div className='entityContainer'>
      <Overlay>
        <div>Are you sure?</div>
        <button>yes</button>
        <button>no</button>
      </Overlay>
      <DepartmentList Edit={handleDepartmentUpdateSlide} />

      <button
        className='addManager-btn'
        onClick={() => handleDepartmentSlide()}
      >
        <span className='addManager-btn-icon'>
          <FaUserPlus />
        </span>
        <span className='addManger-btn-label' onClick={handleDepartmentSlide}>
          Add Department
        </span>
      </button>

      <LeftSlideBar open={departmentSlider} innerRef={departmentSliderRef}>
        <div className='ManageSlidebar-container'>
          <InputField
            label='Department name'
            name='name'
            onChange={handleChange}
          />
          <div className='buttons-container'>
            <ButtonPrime text='add' onClick={handleSubmit} />
          </div>
        </div>
      </LeftSlideBar>

      <LeftSlideBar
        open={departmentUpdateSlider}
        innerRef={departmentUpdateSliderRef}
      >
        <div className='ManageSlidebar-container'>
          <InputField
            label='Department name'
            name='name'
            onChange={handleChange}
          />
          <div className='buttons-container'>
            <ButtonPrime text='Update' onClick={handleUpdate} />
          </div>
        </div>
      </LeftSlideBar>
    </div>
  )
}

export default DepartmentEntity
