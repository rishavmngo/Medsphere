import './prescription.style.css'
import Group1 from '../group1/group1.component'
import Group2 from '../group2/group2.component'
import Group3 from '../group3/group3.component'
import { useContext, useEffect, useRef } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import { useParams } from 'react-router-dom'
import { parseInt } from 'lodash'
import printDocument from '../../utils/pdf'

function Prescription() {
  const { currentPrescription, getPrescrcriptionById } =
    useContext(PrescriptionContext)
  const { prescriptionId } = useParams()
  const input = useRef(0)
  useEffect(() => {
    getPrescrcriptionById(parseInt(prescriptionId))
  }, [])

  const handleExport = () => {
    printDocument(input.current)
  }
  useEffect(() => {
    console.log(input)
  }, [input])

  return (
    <>
      <button onClick={handleExport}>print</button>
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
