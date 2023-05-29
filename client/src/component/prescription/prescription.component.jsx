import './prescription.style.css'
import Group1 from '../group1/group1.component'
import Group2 from '../group2/group2.component'
import Group3 from '../group3/group3.component'
import { useContext, useEffect, useRef, useState } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import { useParams } from 'react-router-dom'
import { parseInt } from 'lodash'
import printDocument from '../../utils/pdf'
import { PreviewA4 } from '@diagoriente/react-preview-a4'
import Pdf from '../pdfTesting/pdfTesting.component'
import { Button } from '@mui/material'

function Prescription() {
  const { currentPrescription, getPrescrcriptionById } =
    useContext(PrescriptionContext)
  const { prescriptionId } = useParams()
  const [preview, togglePreview] = useState(false)
  const input = useRef(0)
  useEffect(() => {
    getPrescrcriptionById(parseInt(prescriptionId))
  }, [])

  const handlePreview = () => {
    togglePreview(!preview)
  }
  useEffect(() => {
    console.log(input)
  }, [input])

  return (
    <>
      <Button onClick={handlePreview} variant='outlined' id='preview_button'>
        preview
      </Button>
      {preview && (
        <Pdf preview={currentPrescription} togglePreview={togglePreview} />
      )}

      <div id='prescription' className='prescription' ref={input}>
        <div className='groups'>
          <Group1 data={currentPrescription} />
          <Group2 data={currentPrescription} />
          <Group3 data={currentPrescription} prescriptionId={prescriptionId} />
        </div>
      </div>
    </>
  )
}

export default Prescription
