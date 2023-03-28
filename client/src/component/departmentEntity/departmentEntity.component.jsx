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
  const { addDepartment, deleteDepartment, updateDepartment } =
    useContext(DepartmentContext)
  const [formField, setFormField] = useState(defaultFormField)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  function handleDepartmentSlide() {
    setFormField(defaultFormField)
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
    updateDepartment({ ...formField, id: itemToEdit.id })
    setDepartmentUpdateSlider(false)
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
  const handleConfirmation = () => {
    deleteDepartment(itemToDelete)
    setOverlayOpen(false)
  }
  const handleDelete = (item) => {
    setItemToDelete(item)
    setOverlayOpen(true)
  }
  const handleEdit = (item) => {
    setItemToEdit(item)
    const editedFormField = { ...formField, name: item.name }
    console.log(editedFormField)
    setFormField(editedFormField)
    setDepartmentUpdateSlider(true)
  }

  return (
    <div className='entityContainer'>
      {overlayOpen && (
        <Overlay>
          <div className='overlay-children-container'>
            <div className='department-overlay-msg'>
              Want to delete {itemToDelete && itemToDelete.name}?
            </div>
            <div className='department-overlay-btns'>
              <div
                className='department-overlay-btn'
                onClick={() => setOverlayOpen(false)}
              >
                No
              </div>
              <div
                className='department-overlay-btn btn-yes'
                onClick={handleConfirmation}
              >
                Yes
              </div>
            </div>
          </div>
        </Overlay>
      )}
      <DepartmentList
        Edit={(item) => handleEdit(item)}
        Delete={(item) => handleDelete(item)}
      />

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
            value={formField['name']}
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
            value={formField['name']}
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
