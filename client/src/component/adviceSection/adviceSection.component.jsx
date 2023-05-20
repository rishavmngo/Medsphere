import { useContext, useEffect, useState } from 'react'
import { PrescriptionContext } from '../../context/prescription.context'
import './adviceSection.style.css'

function AdviceSection({ prescriptionId }) {
  const {
    prescribedAdvice,
    getPrescribedAdvice,
    addPrescribedAdvice,
    deletePrescribedAdvice,
  } = useContext(PrescriptionContext)
  const [adviceInput, setAdviceInput] = useState('')

  const addAdviceHandler = () => {
    try {
      addPrescribedAdvice(prescriptionId, adviceInput)
      clearInput()
    } catch (error) {
      console.log(error)
    }
  }
  const clearInput = () => {
    setAdviceInput('')
  }
  const handleDelete = (id) => {
    try {
      deletePrescribedAdvice(id, prescriptionId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPrescribedAdvice(prescriptionId)
  }, [])

  return (
    <div className='advice-section'>
      <h2 className='advice-section-title'>Advice Given</h2>
      <ul>
        {prescribedAdvice.map(({ advice, id }) => (
          <li
            onClick={() => handleDelete(id)}
            className='prescribedAdviceItem'
            key={id}
          >
            {advice}
          </li>
        ))}

        <span className='insert-advice-input'>
          <input
            placeholder='advice'
            value={adviceInput}
            onChange={(e) => {
              setAdviceInput(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addPrescribedAdvice(prescriptionId, adviceInput)
                clearInput()
              }
            }}
          />
          <span className='advice-add' onClick={addAdviceHandler}>
            add
          </span>
        </span>
      </ul>
    </div>
  )
}

export default AdviceSection
