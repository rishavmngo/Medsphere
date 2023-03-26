import './manageTable.style.css'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
const ManageTable = ({ columns, bodyData, body, pkey, Edit, Delete }) => {
  return (
    <div className='ManageTable-container'>
      <table className='ManageTable-inner'>
        <thead>
          <tr className='table-row table-header'>
            {columns.map((column, index) => {
              return (
                <td key={index} className='table-heading'>
                  {column}
                </td>
              )
            })}
            <td>Actions</td>
          </tr>
        </thead>
        {body.map((row) => {
          return (
            <tbody key={row[pkey]}>
              <tr className='table-row table-data'>
                {bodyData.map((columnName) => {
                  return <td>{row[columnName]}</td>
                })}
                <td className='action-icons-row'>
                  <span
                    className='table-row-action-icons'
                    onClick={() => Edit()}
                  >
                    <MdEdit />
                    <div className='tool-tip'>Edit</div>
                  </span>
                  <span
                    className='table-row-action-icons'
                    onClick={() => Delete()}
                  >
                    <div className='tool-tip'>Delete</div>
                    <FaTrash />
                  </span>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default ManageTable
