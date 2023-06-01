import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { PatientsContext } from '../../context/patients.context'
import './patientsEdit.style.css'
const PatientsEdit = ({ setItem, item, open, toggle }) => {
  const { updateById } = useContext(PatientsContext)
  const handleChange = (event) => {
    const { name, value } = event.target

    setItem({ ...item, [name]: value })
  }
  const updatePatient = async (item) => {
    try {
      const success = await updateById(item.id, item)
      toast.success('Update Successful', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } catch (error) {
      toast.Error('Update unsuccessful', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      console.error(error)
    }
  }
  return (
    <Dialog open={open}>
      <DialogTitle>Patients edit</DialogTitle>
      <DialogContent id='test-2'>
        <TextField
          label='Display Name'
          name='displayname'
          value={item.name}
          onChange={handleChange}
        />
        <TextField
          label='Age'
          name='age'
          value={item.age}
          onChange={handleChange}
        />
        <TextField
          label='Address'
          name='address'
          value={item.address}
          onChange={handleChange}
        />
        <TextField
          label='Blood group'
          name='blood_group'
          value={item.blood_group}
          onChange={handleChange}
        />
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              updatePatient(item)
              toggle(false)
            }}
          >
            Update
          </Button>
          <Button variant='outlined' onClick={() => toggle(false)}>
            close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default PatientsEdit
