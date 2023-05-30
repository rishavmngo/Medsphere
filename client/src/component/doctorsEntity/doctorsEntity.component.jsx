import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { FaUserPlus } from 'react-icons/fa'
import InputField from '../inputField/inputField.component'
import DoctorsList from '../doctorsList/doctorsList.component'
import LeftSlideBar from '../leftSlideBar/leftSlideBar.component'
import Dropdown from '../dropdown/dropdown.componet'
import ButtonPrime from '../primary_btn/primary_btn.component'
import { DoctorsContext } from '../../context/doctors.context'
import { DepartmentContext } from '../../context/department.context'
import { FaTrash, FaUpload } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import './doctorsEntity.style.css'
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'
const defaultFormField = {
  displayName: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  qualifications: '',
  phone_number: '',
}
const DoctorsEntity = () => {
  const doctorSliderRef = useRef()
  const [dialogueOpen, toggleDialogue] = useState(false)
  const [uploadSignOpen, toggleUploadSignOpen] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(false)
  const [currentDoctorToUpdate, setCurrentDoctorToUpdate] = useState(null)
  const [image, setImage] = useState(null)
  const [openEditDoctor, toggleOpenEditDoctor] = useState(null)

  const { user } = useContext(AuthContext)
  const {
    registerDoctor,
    deleteDoctorById,
    uploadSignatureForDoctor,
    updateDoctorById,
  } = useContext(DoctorsContext)
  const { department, getAllDepartmentForOrg } = useContext(DepartmentContext)
  const [itemToDelete, setItemToDelete] = useState(null)

  const [formField, setFormField] = useState(defaultFormField)
  const [updateFormField, setUpdateFormField] = useState(defaultFormField)

  const [currentDepartment, setCurrentDepartment] = useState({
    value: '',
    id: null,
  })

  const [doctorsSlider, setDoctorsSlider] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    // const fileReader = new FileReader()
    // fileReader.readAsDataURL(file)
    // fileReader.addEventListener('load', function (e) {
    //   setDisplayImage(e.currentTarget.result)
    // })
    // uploadProfilePicture(file)
  }

  const uploadSignature = async () => {
    if (!image) {
      return toast.warning('File not selected', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
    //upload signature
    const success = await uploadSignatureForDoctor(currentDoctor.uid, image)
    if (success)
      toast.success('Upload Sucessfull', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    else {
      toast.error('Upload Failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
    toggleUploadSignOpen(false)
    // console.log(currentDoctor.uid, image)
  }
  function handleDoctorSlider() {
    setDoctorsSlider(true)
  }
  const updateDoctor = () => {
    // updateFormField.password = currentDoctorToUpdate.password
    updateDoctorById(updateFormField.uid, updateFormField)
    toggleOpenEditDoctor(false)
  }

  const handleConfirmation = () => {
    deleteDoctorById(itemToDelete.uid)
    toggleDialogue(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormField({ ...formField, [name]: value })
  }

  const handleUpdateChange = (event) => {
    const { name, value } = event.target

    setUpdateFormField({ ...updateFormField, [name]: value })
  }
  const handleSubmit = () => {
    if (formField.password != formField.confirmPassword) {
      return toast.error("password and confirmPassword did't match", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
    registerDoctor({
      ...formField,
      department_id: parseInt(currentDepartment.id),
      organisation_id: user.uid,
    })
    setDoctorsSlider(false)
    setFormField(defaultFormField)
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

  const fetchDoctorById = async (item) => {
    // const { id } = item
    try {
      // const doctor = await getDoctorById(id)
      // setCurrentDoctorToUpdate(doctor)
    } catch (error) {}
  }

  useEffect(() => {
    getAllDepartmentForOrg()
  }, [])

  useEffect(() => {
    if (department.length === 0) return
    setCurrentDepartment({ value: department[0].name, id: department[0].id })
  }, [department])

  return (
    <>
      <div className='entityContainer'>
        <DoctorsList
          actionArr={[
            {
              name: 'Edit',
              icon: <MdEdit />,
              func: (item) => {
                setUpdateFormField(item)
                setCurrentDoctorToUpdate(item)
                toggleOpenEditDoctor(true)
              },
            },
            {
              name: 'Signature',
              icon: <FaUpload />,
              func: (item) => {
                setCurrentDoctor(item)
                toggleUploadSignOpen(true)
              },
            },
            {
              name: 'Delete',
              icon: <FaTrash />,
              func: (item) => {
                setItemToDelete(item)
                toggleDialogue(true)
              },
            },
          ]}
        />
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
              value={formField.displayName}
              onChange={handleChange}
            />

            <InputField
              label='Age'
              name='age'
              onChange={handleChange}
              value={formField.age}
            />
            <InputField
              label='Email'
              name='email'
              onChange={handleChange}
              value={formField.email}
            />
            <InputField
              label='Password'
              name='password'
              onChange={handleChange}
              value={formField.password}
              type='password'
            />
            <InputField
              label='Confirm password'
              name='confirmPassword'
              onChange={handleChange}
              value={formField.confirmPassword}
              type='password'
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
      <Dialog open={dialogueOpen}>
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>{`Remove Dr. ${
          itemToDelete && itemToDelete.displayname
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
      <Dialog open={uploadSignOpen}>
        <DialogTitle>Upload Signature of Dr Utkarsh yadav</DialogTitle>
        <DialogContent>
          {/* <Button variant='contained'>Upload</Button> */}
          <Input type='file' color='primary' onChange={handleFileChange} />
        </DialogContent>
        <Button variant='outline' onClick={() => uploadSignature()}>
          Upload
        </Button>
        <DialogActions>
          <Button onClick={() => toggleUploadSignOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDoctor}>
        <DialogTitle>Modify Doctor</DialogTitle>
        <DialogContent id='test-1'>
          <TextField
            type='text'
            label='Display Name'
            name='displayname'
            color='primary'
            onChange={handleUpdateChange}
            variant='outlined'
            id='outlined-basic'
            value={updateFormField.displayname}
          />
          <TextField
            type='text'
            label='Email'
            name='email'
            color='primary'
            onChange={handleUpdateChange}
            variant='outlined'
            id='outlined-basic'
            value={updateFormField.email}
          />
          <TextField
            type='text'
            label='Age'
            name='age'
            color='primary'
            onChange={handleUpdateChange}
            variant='outlined'
            id='outlined-basic'
            value={updateFormField.age}
          />
          <TextField
            type='text'
            label='Address'
            name='address'
            color='primary'
            onChange={handleUpdateChange}
            variant='outlined'
            id='outlined-basic'
            value={updateFormField.address}
          />
          <TextField
            type='text'
            label='Phone number'
            name='phone_number'
            color='primary'
            onChange={handleUpdateChange}
            variant='outlined'
            id='outlined-basic'
            value={updateFormField.phone_number}
          />
          <TextField
            type='text'
            label='Qualifications'
            color='primary'
            name='qualifications'
            onChange={handleUpdateChange}
            variant='outlined'
            id='outlined-basic'
            value={updateFormField.qualifications}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={updateDoctor}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DoctorsEntity
