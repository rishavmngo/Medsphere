import { useState } from 'react'
import PrescribedMedicineItem from '../prescribedMedicineItem/prescribedMedicineItem.component'
import './prescribedMedicineList.style.css'
const PrescribedMedicineList = ({ prescribedMedicine }) => {
  return (
    <div className='medicineTable-body-row'>
      {prescribedMedicine.map((med) => {
        return (
          <PrescribedMedicineItem key={med.prescribed_medicine_id} med={med} />
        )
      })}
    </div>
  )
}

export default PrescribedMedicineList
