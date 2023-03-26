import { useContext, useEffect } from 'react'
import { DoctorsContext } from '../../context/doctors.context'
import ManageTable from '../manageTable/manageTable.component'
import './doctorsList.style.css'
const DoctorsList = () => {
  const { doctors, getDoctorsForOrg } = useContext(DoctorsContext)

  useEffect(() => {
    getDoctorsForOrg()
  }, [])

  return (
    <ManageTable
      columns={['Name', 'Age', 'Department', 'Email']}
      body={doctors}
      bodyData={['displayname', 'age', 'department', 'email']}
    />
  )
}

export default DoctorsList
