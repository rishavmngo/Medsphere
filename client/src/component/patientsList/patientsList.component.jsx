import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import ManageTable from '../manageTable/manageTable.component'

const PatientsList = () => {
  const { getPatientsForOrg, patients } = useContext(AuthContext)

  useEffect(() => {
    getPatientsForOrg()
  }, [])

  return (
    <ManageTable
      body={patients}
      columns={['Name', 'Age', 'Gender']}
      bodyData={['name', 'age', 'gender']}
      pkey='id'
    />
  )
  // return (
  //   <div className='patientList-container'>
  //     <table className='patientList-table'>
  //       <thead>
  //         <tr className='patientList-row patientList-header'>
  //           <td className='table-heading'>Name</td>
  //           <td className='table-heading'>Age</td>
  //           <td className='table-heading'>Gender</td>
  //         </tr>
  //       </thead>
  //       {patients.map((patient) => {
  //         const { name, age, id, gender } = patient
  //         return (
  //           <tbody key={id}>
  //             <tr className='patientList-row doctorList-data'>
  //               <td>{name}</td>
  //               <td>{age}</td>
  //               <td>{gender}</td>
  //             </tr>
  //           </tbody>
  //         )
  //       })}
  //     </table>
  //   </div>
  // )
}

export default PatientsList
