import { ReactComponent as OrgLogo } from '../../assets/icon.svg'
function Group1() {
  return (
    <div className='group1'>
      <div className='DoctorsDetail'>
        <div className='DoctorsDetail--details'>
          <h1 className='DoctorName'>Dr. Sachin Chaubey</h1>
          <div>M.B.B.S | M.D | M.S</div>
          <div>Department of Cardiology</div>
          <div>REG NO. 1232423</div>
        </div>
      </div>
      <div className='org-logo'>
        <OrgLogo />
      </div>
      <div className='org-details'>
        <h1 className='OrgName'>Nalanda Hospital</h1>
        <div>O Pocket, Ganga Nagar, Uttar Pradesh</div>
        <div>Ph: +9112323233 | 18003456</div>
      </div>
    </div>
  )
}

export default Group1
