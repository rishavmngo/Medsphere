import { useContext, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
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
      actionArr={[
        { name: 'Edit', icon: <MdEdit />, func: () => null },
        { name: 'Delete', icon: <FaTrash />, func: () => null },
      ]}
    />
  )
}

export default DoctorsList
