import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import './doctorsList.style.css'
const DoctorsList = () => {
  const { doctors, fetchDoctorsForOrg } = useContext(AuthContext)

  useEffect(() => {
    if (doctors.length === 0) fetchDoctorsForOrg()
  }, [])
  return (
    <div className='doctorList-container'>
      <table className='doctorList-table'>
        <tr className='doctorList-row doctorList-header'>
          <td className='table-heading'>Name</td>
          <td className='table-heading'>Age</td>
          <td className='table-heading'>Department</td>
          <td className='table-heading'>Email</td>
        </tr>
        {doctors.map((doctor) => {
          const { displayname, email } = doctor
          return (
            <tr className='doctorList-row doctorList-data'>
              <td>{displayname}</td>
              <td>{5}</td>
              <td></td>
              <td>{email}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default DoctorsList
