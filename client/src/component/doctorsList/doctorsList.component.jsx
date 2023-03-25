import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import './doctorsList.style.css'
const DoctorsList = () => {
  const { doctors, setDoctors, fetchDoctorsForOrg } = useContext(AuthContext)

  useEffect(() => {
    fetchDoctorsForOrg()
  }, [fetchDoctorsForOrg])

  return (
    <div className='doctorList-container'>
      <table className='doctorList-table'>
        <thead>
          <tr className='doctorList-row doctorList-header'>
            <td className='table-heading'>Name</td>
            <td className='table-heading'>Age</td>
            <td className='table-heading'>Department</td>
            <td className='table-heading'>Email</td>
          </tr>
        </thead>
        {doctors.map((doctor) => {
          const { displayname, age, email, uid, department } = doctor
          return (
            <tbody key={uid}>
              <tr className='doctorList-row doctorList-data'>
                <td>{displayname}</td>
                <td>{age}</td>
                <td>{department}</td>
                <td>{email}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default DoctorsList
