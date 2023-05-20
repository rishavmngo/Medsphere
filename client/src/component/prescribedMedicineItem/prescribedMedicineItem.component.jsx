import './prescribedMedicineItem.style.css'
const PrescribedMedicineItem = ({ med }) => {
  const { dosage, dosageform, duration, medicine_name } = med
  return (
    <div className='medicine-data'>
      <span className='medicineName'>
        {medicine_name} - {dosageform}
      </span>
      <span className='medicineDosage'>{dosage}</span>
      <span className='medicineDuration'>{duration}</span>
    </div>
  )
}

export default PrescribedMedicineItem
