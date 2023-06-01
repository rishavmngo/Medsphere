import PatientsList from '../patientsList/patientsList.component'
import { FaTrash, FaUserPlus } from 'react-icons/fa'
import { useContext, useEffect, useRef, useState } from 'react'
import ButtonPrime from '../primary_btn/primary_btn.component'
import InputField from '../inputField/inputField.component'
import LeftSlideBar from '../leftSlideBar/leftSlideBar.component'
import Dropdown from '../dropdown/dropdown.componet'
import './patientsEntity.style.css'
import { PatientsContext } from '../../context/patients.context'
import PatientsEdit from '../patientsEdit/patientsEdit.component'
import { MdEdit } from 'react-icons/md'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'

const defaultFormField = {
  name: '',
  age: null,
  blood_group: null,
  address: null,
}
const PatientsEntity = () => {
  const patientsSliderRef = useRef()
  const [patientsSlider, setPatientsSlider] = useState(false)
  const [open, toggleOpen] = useState(false)
  const [formField, setFormField] = useState(defaultFormField)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(defaultFormField)
  const [dialogueOpen, toggleDialogue] = useState(false)

  const gender = [
    { id: 0, name: 'male' },
    { id: 1, name: 'female' },
    { id: 2, name: 'others' },
  ]

  const [genders, setGenders] = useState(gender)
  const { addPatients, deleteById } = useContext(PatientsContext)
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

  const handleConfirmation = () => {
    // deleteDoctorById(itemToDelete.uid)
    deleteById(itemToDelete.id)
    // console.log(itemToDelete)
    toggleDialogue(false)
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
      <PatientsList
        actionArr={[
          {
            name: 'Edit',
            icon: <MdEdit />,
            func: (item) => {
              setItemToEdit(item)
              toggleOpen(true)
            },
          },

          {
            name: 'Delete',
            icon: <FaTrash />,
            func: (item) => {
              console.log(item)
              setItemToDelete(item)
              toggleDialogue(true)
            },
          },
        ]}
      />

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
          <InputField label='Name' name='name' onChange={handleChange} />
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
      <PatientsEdit
        item={itemToEdit}
        setItem={setItemToEdit}
        open={open}
        toggle={toggleOpen}
      />

      <Dialog open={dialogueOpen}>
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>{`Remove patient ${
          itemToDelete && itemToDelete.name
        }`}</DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => toggleDialogue(false)}>
            No
          </Button>

          <Button
            autoFocus
            onClick={handleConfirmation}
            color='error'
            variant='contained'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PatientsEntity
