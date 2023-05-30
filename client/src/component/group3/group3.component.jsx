import { useContext, useEffect, useState } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import AdviceSection from '../adviceSection/adviceSection.component'
import InsertPrescribedMedicine from '../prescribedMedicine/prescribedMedicine.component'
import PrescribedMedicineList from '../prescribedMedicineList/prescribedMedicineList.component'
import './group3.style.css'
function Group3({ data, prescriptionId }) {
  const { prescribedMedicine, getPrescribedMedicine } =
    useContext(PrescriptionContext)
  useEffect(() => {
    const { id } = data
    if (!id) return
    getPrescribedMedicine(id)
  }, [data])
  const { doctors_name, doctors_qualifications, doctors_signature } = data

  return (
    <div className='group3'>
      <div className='medicineTable'>
        <div className='medicineTable-head'>
          <span className='medicineTable-col-head'>Medicine Name</span>
          <span className='medicineTable-col-head'>Dosage</span>
          <span className='medicineTable-col-head'>Duration</span>
        </div>

        <div className='medicineTable-body'>
          <PrescribedMedicineList prescribedMedicine={prescribedMedicine} />
          <InsertPrescribedMedicine prescriptionId={prescriptionId} />
        </div>
        <AdviceSection prescriptionId={prescriptionId} />
        <div className='medicineTable-footer'>
          <div className='signature-comp'>
            <img
              className='doctors_signature'
              src={`http://localhost:3000/static/${doctors_signature}`}
            />
            <div className='signature-comp__doctors_details'>
              <div className='signature-comp__doctors-details-name'>
                Dr.{doctors_name}
              </div>
              <div className='signature-comp__doctors-details-qualifications'>
                {doctors_qualifications}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Group3
