import { ReactComponent as OrgLogo } from '../../assets/icon.png'
import png from '../../assets/icon.png'
import './group1.style.css'
function Group1({ data }) {
  const {
    doctors_name,
    doctors_department,
    doctors_qualifications,
    organisation_name,
    organisation_phone_number,
    organisation_address,
    org_logo,
  } = data
  return (
    <div className='group1'>
      <div className='DoctorsDetail group1-nest'>
        <div className='DoctorsDetail--details'>
          <h1 className='DoctorName'>Dr. {doctors_name}</h1>
          <div>{doctors_qualifications}</div>
          <div>{doctors_department}</div>
        </div>
      </div>
      <div className='org-logo group1-nest'>
        {/* <OrgLogo /> */}
        <div className='Plogo'>
          {!org_logo ? (
            <img src={png} />
          ) : (
            <img src={`http://localhost:3000/static/${org_logo}`} />
          )}
        </div>
      </div>
      <div className='org-details group1-nest'>
        <h1 className='OrgName'>{organisation_name}</h1>
        <div>{organisation_address}</div>
        <div>Ph: {organisation_phone_number} | 18003456</div>
      </div>
    </div>
  )
}

export default Group1
