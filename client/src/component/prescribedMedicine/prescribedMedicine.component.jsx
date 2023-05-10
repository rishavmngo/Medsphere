import { useState } from 'react'
import './prescribedMedicine.style.css'

const InsertPrescribedMedicine = () => {
  const [medicine, setMedicine] = useState('')
  const [type, setMedicineType] = useState('')

  const handleInput = (e) => {
    if (medicine.includes('dolo')) {
      setMedicineType('tablet')
    } else if (medicine.includes('sui')) {
      setMedicineType('syrup')
    } else setMedicineType('')
    setMedicine(e.target.value)
  }
  const addType = (type) => {
    switch (type) {
      case 'tablet':
        return (
          <select>
            <option>1 morning, 1 night</option>
            <option>3 times a day</option>
            <option>4 times a day</option>
            <option>1 morning</option>
            <option>1 night</option>
            <option>1 evening</option>
          </select>
        )
      case 'syrup':
        return <p>150 ml</p>
      default:
        return <input type='text' placeholder='manual dosages' />
    }
  }
  return (
    <div className='insertPrescribedMedicine'>
      <input value={medicine} onChange={handleInput} />
      {addType(type)}
      <div>
        <input type='text' />
        <select name='' id='dosage'>
          <option value='volvo'>week</option>
          <option value='saab'>days</option>
          <option value='mercedes'>months</option>
        </select>
      </div>
    </div>
  )
}

export default InsertPrescribedMedicine
