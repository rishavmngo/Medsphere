import './manageTable.style.css'
import { v4 } from 'uuid'
const ManageTable = ({ columns, bodyData, body, pkey, actionArr = [] }) => {
  return (
    <div className='ManageTable-container'>
      <table className='ManageTable-inner'>
        <thead>
          <tr className='table-row table-header'>
            {columns.map((column) => {
              return (
                <td key={v4()} className='table-heading'>
                  {column}
                </td>
              )
            })}
            {actionArr.length > 0 && <td>Actions</td>}
          </tr>
        </thead>
        {body.map((row) => {
          return (
            <tbody key={v4()}>
              <tr className='table-row table-data'>
                {bodyData.map((columnName) => {
                  return <td key={v4()}>{row[columnName]}</td>
                })}
                {actionArr.length > 0 && (
                  <td className='action-icons-row'>
                    {actionArr.map(({ func, icon, name }) => {
                      return (
                        <span
                          className='table-row-action-icons'
                          onClick={() => func(row)}
                          key={v4()}
                        >
                          <div className='tool-tip'>{name}</div>
                          {icon}
                        </span>
                      )
                    })}
                  </td>
                )}
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default ManageTable
