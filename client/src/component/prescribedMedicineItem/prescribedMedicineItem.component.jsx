import './prescribedMedicineItem.style.css'
const PrescribedMedicineItem = ({ med }) => {
  const { dosage, dosage_form, duration, name } = med
  return (
    <div className='medicine-data'>
      <span className='medicineName'>
        {name}-{dosage_form}
      </span>
      <span className='medicineDosage'>{dosage}</span>
      <span className='medicineDuration'>{duration}</span>
    </div>
  )
}

export default PrescribedMedicineItem
