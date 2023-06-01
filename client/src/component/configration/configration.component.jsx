import { TextField, Button } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import './configration.style.css'

import { toast } from 'react-toastify'
const defaultConfig = {
  prescription_background: 'white',
  prescription_primary_color: 'crimson',
}
const Configration = ({ user }) => {
  const { orgConfigration, fetchOrgConfigration, updateOrgConfigration } =
    useContext(PrescriptionContext)

  const [configState, setConfigState] = useState(orgConfigration)

  const handleChange = (event) => {
    const { name, value } = event.target

    setConfigState({ ...configState, [name]: value })
  }
  const updateConfigration = async () => {
    let id
    if (user.is_organisation) id = user.uid
    else id = user.organisation_id
    const success = await updateOrgConfigration(id, configState)
    if (success)
      toast.success('Updated Sucessfull', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    else {
      toast.error('Updated Failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }
  useEffect(() => {
    let id
    if (user.is_organisation) id = user.uid
    else id = user.organisation_id
    async function any() {
      try {
        const success = await fetchOrgConfigration(id)
      } catch (error) {}
    }
    any()
  }, [user])
  useEffect(() => {
    setConfigState(orgConfigration)
  }, [orgConfigration])

  return (
    <div>
      <div className='config-unit-container'>
        <TextField
          label='Prescription Background'
          name='prescription_background'
          variant='filled'
          value={configState && configState.prescription_background}
          onChange={handleChange}
        />
        <span
          className='preview'
          style={{
            backgroundColor: configState && configState.prescription_background,
          }}
        ></span>
      </div>

      <div className='config-unit-container' style={{ marginTop: '10px' }}>
        <TextField
          label='Prescription Primary Color'
          name='prescription_primary_color'
          variant='filled'
          value={configState && configState.prescription_primary_color}
          onChange={handleChange}
        />
        <span
          className='preview'
          style={{
            backgroundColor:
              configState && configState.prescription_primary_color,
          }}
        ></span>
      </div>
      <Button
        onClick={updateConfigration}
        variant='outlined'
        style={{ marginTop: '10px' }}
      >
        Update Configration
      </Button>
    </div>
  )
}

export default Configration
