import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'

const DoctorsList = () => {
  const { doctors, fetchDoctorsForOrg } = useContext(AuthContext)

  useEffect(() => {
    if (doctors.length === 0) fetchDoctorsForOrg()
  }, [])
  return (
    <div>
      {doctors.map((doctor) => {
        const { displayname } = doctor
        return <div key={doctor.uid}>{displayname}</div>
      })}
    </div>
  )
}

export default DoctorsList
