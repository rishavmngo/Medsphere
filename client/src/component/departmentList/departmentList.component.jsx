import { useContext, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
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
      actionArr={[
        { name: 'Edit', icon: <MdEdit />, func: Edit },
        { name: 'Delete', icon: <FaTrash />, func: Delete },
      ]}
    />
  )
}

export default DepartmentList
