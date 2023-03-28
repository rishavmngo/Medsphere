import { useContext, useEffect } from 'react'
import { DepartmentContext } from '../../context/department.context'
import ManageTable from '../manageTable/manageTable.component'

const DepartmentList = ({ Edit = () => null, Delete = () => null }) => {
  const { getAllDepartmentForOrg, department } = useContext(DepartmentContext)
  useEffect(() => {
    getAllDepartmentForOrg()
  }, [])
  return (
    <ManageTable
      body={department}
      columns={['Department name']}
      bodyData={['name']}
      Edit={Edit}
      Delete={Delete}
    />
  )
}

export default DepartmentList
