import { parseInt } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import './prescribedMedicine.style.css'

const defaultMedicine = {
  id: '',
  dosageform: '',
  dosage: '',
  duration: 10,
  durationUnit: 'days',
}

const InsertPrescribedMedicine = ({ prescriptionId }) => {
  const [medicine, setMedicine] = useState('')
  const [type, setMedicineType] = useState('')
  const [medicineList, setMedicineList] = useState([])
  const { getPrescribedMedicineBySubstring, addPrescriptionMedicine } =
    useContext(PrescriptionContext)
  const [inputActive, setInputActive] = useState(true)
  const [currentMedicineToAdd, setCurrentMedicineToAdd] =
    useState(defaultMedicine)
  const [durationUnit, setDurationUnit] = useState('days')
  const [durationPre, setDurationPre] = useState(10)
  const [manualDosage, setManualDosage] = useState('')

  const handleInput = (e) => {
    if (!inputActive) setInputActive(true)
    // console.log(e.target.value)
    setMedicine(e.target.value)
  }
  const decideDosage = () => {
    if (currentMedicineToAdd.dosageform.includes('tablet'))
      setMedicineType('tablet')
    else setMedicineType('')
  }
  const dosageSelection = (e) => {
    setCurrentMedicineToAdd({
      ...currentMedicineToAdd,
      ['dosage']: e.target.value,
    })
  }
  useEffect(() => {
    decideDosage()
  }, [currentMedicineToAdd])

  const addMedicine = () => {
    addPrescriptionMedicine(currentMedicineToAdd, parseInt(prescriptionId))
  }

  const handleClick = (med) => {
    setMedicine(med.brand_name)
    setInputActive(false)
    const { id, dosageform } = med
    const lowerDosageForm = dosageform.toLowerCase()
    setCurrentMedicineToAdd({
      ...currentMedicineToAdd,
      ['id']: id,
      ['dosageform']: lowerDosageForm,
      ['dosage']: '1 morning, 1 night',
    })
  }
  const addType = (type) => {
    switch (type) {
      case 'tablet':
        return (
          <div className='tablet_dosage_selection'>
            <select onChange={dosageSelection}>
              <option>1 morning, 1 night</option>
              <option>3 times a day</option>
              <option>4 times a day</option>
              <option>1 morning</option>
              <option>1 night</option>
              <option>1 evening</option>
            </select>
          </div>
        )
      case 'syrup':
        return <p>150 ml</p>
      default:
        return (
          <div className='manual-dosage'>
            <input
              type='text'
              value={manualDosage}
              onChange={(e) => {
                setManualDosage(e.target.value)
                setCurrentMedicineToAdd({
                  ...currentMedicineToAdd,
                  ['dosage']: e.target.value,
                })
              }}
              placeholder='manual dosages'
            />
          </div>
        )
    }
  }
  useEffect(() => {
    const getData = setTimeout(async () => {
      const meds = await getPrescribedMedicineBySubstring(medicine)
      setMedicineList(meds)
    }, 500)

    return () => clearTimeout(getData)
  }, [medicine])

  return (
    <div className='insertPrescribedMedicine'>
      <div className='medicine-input-component'>
        <input
          placeholder='medicine name'
          value={medicine}
          onChange={handleInput}
        />
        {medicineList.length > 0 && inputActive && (
          <ul className='medicineList__completion'>
            {medicineList.map((med) => {
              return (
                <li
                  key={med.id}
                  className='medicineList__item'
                  onClick={() => {
                    handleClick(med)
                  }}
                >
                  <span className='completion__name'> {med.brand_name}</span>
                  <span className='completion__dosageform'>
                    {med.dosageform}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {addType(type)}
      <div className='duration-component'>
        <input
          type='text'
          value={durationPre}
          onChange={(e) => {
            const duration = parseInt(e.target.value)
            setDurationPre(duration)
            setCurrentMedicineToAdd({
              ...currentMedicineToAdd,
              ['duration']: duration,
            })
          }}
        />
        <span className='duration-btns'>
          <select
            name=''
            id='dosage'
            value={durationUnit}
            onChange={(e) => {
              setDurationUnit(e.target.value)
              setCurrentMedicineToAdd({
                ...currentMedicineToAdd,
                ['durationUnit']: e.target.value,
              })
            }}
          >
            <option value='weeks'>weeks</option>
            <option value='days'>days</option>
            <option value='months'>months</option>
          </select>
          <button className='add-medicine' onClick={addMedicine}>
            add
          </button>
        </span>
      </div>
    </div>
  )
}

export default InsertPrescribedMedicine
