import { PreviewA4 } from '@diagoriente/react-preview-a4'
import './pdfTesting.style.css'
import printDocument from '../../utils/pdf'
import { useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { Close, Delete, Download } from '@mui/icons-material'
const Pdf = ({ preview, togglePreview }) => {
  const input = useRef(0)
  const handleExport = () => {
    printDocument(input.current)
  }
  useEffect(() => {}, [input])
  return (
    <div className='preview-comp'>
      {/* <button onClick={handleExport} className='export'> */}
      {/*   print */}
      {/* </button> */}
      <div className='close-btn'>
        <Button
          variant='outline'
          startIcon={<Close />}
          onClick={() => togglePreview(false)}
        />
      </div>
      <div className='export-btn'>
        <Button
          onClick={handleExport}
          variant='contained'
          startIcon={<Download />}
        >
          Download
        </Button>
      </div>
      <div ref={input} className='pdf4'>
        <div className='section-one child-section'>
          <div className='export__doctors-info'>
            <span className='export_doctor_name'>Dr. Sachin Chaubey</span>
            <span className='export_doctor_qulification'>
              M.B.B.S | M.D | M.S
            </span>
            <span className='export_doctor_qualification'>
              Department of Cardiology
            </span>
            <span className='export_doctor_reg_no'>REG No. 12352343</span>
          </div>
          <div className='export__org_icon'>
            <img src={`http://localhost:3000/static/${preview.org_logo}`} />
          </div>
          <div className='export__org_info'>
            <span className='export_org_name'>Nalanda Hospital</span>
            <span className='export__org_address'>
              O Pocket, Ganga Nagar Meerut, Uttar Pradesh 250001
            </span>
            <span className='export__phone_number'>
              Ph: +91123232323 | 180020522
            </span>
          </div>
        </div>

        <div className='section-two child-section'>
          <span className='export__section-two-item'>
            <span className='export_item-first'>ID 4 -</span>
            <span className='export_item-two'>Utkarsh Yadav</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Date:</span>
            <span className='export_item-two'>5/19/2023</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Age:</span>
            <span className='export_item-two'>21</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Blood group:</span>
            <span className='export_item-two'>A+</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Address:</span>
            <span className='export_item-two'>Ganganagar merrut 25033</span>
          </span>
        </div>
        <div className='section-three child-section'>
          <div className='section-three-table-header'>
            <span>Medicine Name</span>
            <span>Dosage</span>
            <span>Duration</span>
          </div>
          <div className='section-three-table-row'>
            <span>Resant - Tablet</span>
            <span>1 morning, 1 night</span>
            <span>10 days</span>
          </div>
          <div className='section-three-table-row'>
            <span>Resant - Tablet</span>
            <span>1 morning, 1 night</span>
            <span>10 days</span>
          </div>
        </div>
        <div className='section-four child-section'>
          <h2 className='advice-given-title'>Advice Given: </h2>
          <div className='export_advice-list'>
            <span>avoid spicy food</span>
            <span>Exercise daily</span>
          </div>
        </div>
        <div className='section-five child-section'>
          <div className='export-signature-component'>
            <span className='export_signature'>
              <img
                src={`http://localhost:3000/static/${preview.doctors_signature}`}
              />
            </span>
            <span className='export-signature-doctor-name'>
              Dr Sachin Chaubey
            </span>
            <span className='export-signature-doctor-qual'>
              M.B.B.S | M.D | M.S
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pdf
