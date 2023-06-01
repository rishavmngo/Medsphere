import { useContext, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { PatientsContext } from '../../context/patients.context'
import ManageTable from '../manageTable/manageTable.component'

const PatientsList = ({ actionArr }) => {
  const { getPatientsForOrg, patients } = useContext(PatientsContext)

  useEffect(() => {
    getPatientsForOrg()
  }, [])

  return (
    <ManageTable
      body={patients}
      columns={['Name', 'Age', 'Gender']}
      bodyData={['name', 'age', 'gender']}
      pkey='id'
      actionArr={actionArr}
    />
  )
}
export default PatientsList
