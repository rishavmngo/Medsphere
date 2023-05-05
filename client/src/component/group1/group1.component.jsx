import { ReactComponent as OrgLogo } from '../../assets/icon.svg'
function Group1({ data }) {
  const {
    doctors_name,
    doctors_department,
    doctors_qualifications,
    organisation_name,
    organisation_phone_number,
    organisation_address,
  } = data
  return (
    <div className='group1'>
      <div className='DoctorsDetail'>
        <div className='DoctorsDetail--details'>
          <h1 className='DoctorName'>Dr. {doctors_name}</h1>
          <div>{doctors_qualifications}</div>
          <div>{doctors_department}</div>
          {/* <div>REG NO. 1232423</div> */}
        </div>
      </div>
      <div className='org-logo'>
        <OrgLogo />
      </div>
      <div className='org-details'>
        <h1 className='OrgName'>{organisation_name}</h1>
        <div>{organisation_address}</div>
        <div>Ph: {organisation_phone_number} | 18003456</div>
      </div>
    </div>
  )
}

export default Group1
