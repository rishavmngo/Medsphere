import { useContext, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { PatientsContext } from '../../context/patients.context'
import ManageTable from '../manageTable/manageTable.component'

const PatientsList = () => {
  const { getPatientsForOrg, patients } = useContext(PatientsContext)

  useEffect(() => {
    getPatientsForOrg()
  }, [])

  function som() {
    console.log('hello from new actions')
  }

  return (
    <ManageTable
      body={patients}
      columns={['Name', 'Age', 'Gender']}
      bodyData={['name', 'age', 'gender']}
      pkey='id'
      actionArr={[]}
    />
  )
}
export default PatientsList
