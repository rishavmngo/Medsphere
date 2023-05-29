import { useContext, useEffect } from 'react'
import { FaTrash, FaUpload } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { DoctorsContext } from '../../context/doctors.context'
import ManageTable from '../manageTable/manageTable.component'
import './doctorsList.style.css'
const DoctorsList = ({ actionArr }) => {
  const { doctors, getDoctorsForOrg } = useContext(DoctorsContext)

  useEffect(() => {
    getDoctorsForOrg()
  }, [])

  return (
    <ManageTable
      columns={['Name', 'Age', 'Department', 'Email']}
      body={doctors}
      bodyData={['displayname', 'age', 'department', 'email']}
      actionArr={actionArr}
    />
  )
}

export default DoctorsList
