import { useContext, useEffect, useState } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import InsertPrescribedMedicine from '../prescribedMedicine/prescribedMedicine.component'
import PrescribedMedicineList from '../prescribedMedicineList/prescribedMedicineList.component'
import './group3.style.css'
function Group3({ data }) {
  const { prescribedMedicine, getPrescribedMedicine } =
    useContext(PrescriptionContext)
  useEffect(() => {
    const { id } = data
    if (!id) return
    getPrescribedMedicine(id)
  }, [data])

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
        </div>
        <div className='medicineTable-footer'>
          <InsertPrescribedMedicine />
        </div>
      </div>
    </div>
  )
}
export default Group3
