import { PreviewA4 } from '@diagoriente/react-preview-a4'
import './pdfTesting.style.css'
import printDocument from '../../utils/pdf'
import { useContext, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { Close, Delete, Download } from '@mui/icons-material'
import { PrescriptionContext } from '../../context/prescription.context'
const Pdf = ({ prescriptionId, preview, togglePreview }) => {
  const input = useRef(0)
  const {
    prescribedMedicine,
    prescribedAdvice,
    getPrescribedMedicine,
    getPrescribedAdvice,
    fetchOrgConfigration,
    orgConfigration,
  } = useContext(PrescriptionContext)
  const handleExport = () => {
    printDocument(input.current)
  }
  const {
    doctors_name,
    doctors_qualifications,
    doctors_signature,
    doctors_department,
    organisation_address,
    organisation_email,
    organisation_name,
    organisation_phone_number,
    patients_address,
    patients_age,
    patients_blood_group,
    patients_gender,
    patients_id,
    patients_name,
    id,
    timestamp,
    org_id,
  } = preview
  const date = new Date(timestamp)
  const localFormat = date.toLocaleString().split(',')[0]

  useEffect(() => {
    getPrescribedMedicine(id)
    getPrescribedAdvice(id)
    fetchOrgConfigration(org_id)
  }, [id])
  useEffect(() => {}, [input])
  return (
    <div className='preview-comp'>
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
        <div
          className='section-one child-section'
          style={{
            backgroundColor:
              orgConfigration && orgConfigration.prescription_background
                ? orgConfigration.prescription_background
                : 'white',
          }}
        >
          <div className='export__doctors-info'>
            <span
              className='export_doctor_name'
              style={{
                color:
                  orgConfigration && orgConfigration.prescription_primary_color,
              }}
            >
              Dr. {preview.doctors_name}
            </span>
            <span className='export_doctor_qulification'>
              {!!doctors_qualifications
                ? doctors_qualifications
                : 'M.B.B.S | M.D | M.S'}
            </span>
            <span className='export_doctor_qualification'>
              {doctors_department}
            </span>
            <span className='export_doctor_reg_no'>REG No. 12352343</span>
          </div>
          <div className='export__org_icon'>
            <img src={`http://localhost:3000/static/${preview.org_logo}`} />
          </div>
          <div className='export__org_info'>
            <span
              className='export_org_name'
              style={{
                color:
                  orgConfigration && orgConfigration.prescription_primary_color,
              }}
            >
              {organisation_name}
            </span>
            <span className='export__org_address'>
              {!!organisation_address
                ? organisation_address
                : 'O Pocket, Ganga Nagar Meerut, Uttar Pradesh 250001'}
            </span>
            <span className='export__phone_number'>
              Ph:{' '}
              {!!organisation_phone_number
                ? `${organisation_phone_number} |`
                : ''}{' '}
              180020522
            </span>
          </div>
        </div>

        <div
          className='section-two child-section'
          style={{
            backgroundColor:
              orgConfigration && orgConfigration.prescription_background
                ? orgConfigration.prescription_background
                : 'white',
          }}
        >
          <span className='export__section-two-item'>
            <span className='export_item-first'>ID {patients_id} -</span>
            <span className='export_item-two'>{patients_name}</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Date:</span>
            <span className='export_item-two'>
              {localFormat ? localFormat : '5/19/2023'}
            </span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Age:</span>
            <span className='export_item-two'>{patients_age}</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Blood group:</span>
            <span className='export_item-two'>{patients_blood_group}</span>
          </span>
          <span className='export__section-two-item'>
            <span className='export_item-first'>Address:</span>
            <span className='export_item-two'>{patients_address}</span>
          </span>
        </div>
        <div
          className='section-three child-section'
          style={{
            backgroundColor:
              orgConfigration && orgConfigration.prescription_background
                ? orgConfigration.prescription_background
                : 'white',
          }}
        >
          <div className='section-three-table-header'>
            <span>Medicine Name</span>
            <span>Dosage</span>
            <span>Duration</span>
          </div>
          {prescribedMedicine.map(
            ({
              prescribed_medicine_id,
              medicine_name,
              dosage,
              dosageform,
              duration,
            }) => {
              return (
                <div
                  key={`item.${prescribed_medicine_id}.medicine`}
                  className='section-three-table-row'
                >
                  <span>
                    {medicine_name} - {dosageform}
                  </span>
                  <span>{dosage}</span>
                  <span>{duration}</span>
                </div>
              )
            }
          )}
        </div>
        <div
          className='section-four child-section'
          style={{
            backgroundColor:
              orgConfigration && orgConfigration.prescription_background
                ? orgConfigration.prescription_background
                : 'white',
          }}
        >
          <h2 className='advice-given-title'>Advice Given: </h2>
          <div className='export_advice-list'>
            {prescribedAdvice.map(({ advice, id }) => {
              return <span key={`item.${id}.advice`}>{advice}</span>
            })}
          </div>
        </div>
        <div
          className='section-five child-section'
          style={{
            backgroundColor:
              orgConfigration && orgConfigration.prescription_background
                ? orgConfigration.prescription_background
                : 'white',
          }}
        >
          <div className='export-signature-component'>
            <span className='export_signature'>
              <img
                src={`http://localhost:3000/static/${preview.doctors_signature}`}
              />
            </span>
            <span className='export-signature-doctor-name'>
              Dr {doctors_name}
            </span>
            <span className='export-signature-doctor-qual'>
              {!!doctors_qualifications
                ? doctors_qualifications
                : 'M.B.B.S | M.D | M.S'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pdf
