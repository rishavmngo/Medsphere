import { useContext, useEffect } from 'react'
import { AppointmentContext } from '../../context/appointments.context'
import { AuthContext } from '../../context/auth.context'
import ManageTable from '../manageTable/manageTable.component'
import { MdEdit } from 'react-icons/md'
import { BsCalendarCheck } from 'react-icons/bs'
import { BsFillClipboardCheckFill } from 'react-icons/bs'
import './appointmentList.style.css'
import { useNavigate } from 'react-router-dom'

const AppointmentList = ({
  date,
  currentDropdownItem,
  Delete = () => null,
  Edit,
  handleDone,
}) => {
  const {
    getAllAppointmentsByDate,
    appointments,
    getByDoctorAndDate,
    appointmentsMap,
    getByOrgDoctorAndDate,
  } = useContext(AppointmentContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) return
    if (user.is_organisation && !currentDropdownItem) {
      getAllAppointmentsByDate(date)
    } else if (!user.is_organisation) {
      getByDoctorAndDate(date)
    } else {
      getByOrgDoctorAndDate(date, currentDropdownItem.id)
    }
  }, [date, user, currentDropdownItem])

  return (
    <div>
      <ManageTable
        body={appointmentsMap}
        columns={['Appointments no.', 'Patient Name', 'Age', 'Doctors Name']}
        bodyData={[
          'appointment_number',
          'patients_name',
          'age',
          'doctors_name',
        ]}
        actionArr={[
          { name: 'Edit', icon: <MdEdit />, func: Edit },
          { name: 'Done', icon: <BsCalendarCheck />, func: handleDone },
          {
            name: 'Prescription',
            icon: <BsFillClipboardCheckFill />,
            func: () => {
              navigate('/prescription')
            },
          },
        ]}
      />
    </div>
  )
}

export default AppointmentList
