import axios from 'axios'
import { debounce } from 'lodash'
import { useCallback, useContext, useState } from 'react'
import { MdEditCalendar } from 'react-icons/md'
import AppointmentFilter from '../../component/appointmentFilter/appointmentFilter.component'
import AppointmentList from '../../component/appointmentList/appointmentList.component'
import Completion from '../../component/completion/completion.component'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import ButtonPrime from '../../component/primary_btn/primary_btn.component'
import { AppointmentContext } from '../../context/appointments.context'
import { AuthContext } from '../../context/auth.context'
import { changeDateToIsoFormat } from '../../utils/dates.utils'
import { getTokenFromLocalStorage } from '../../utils/localstorage'
import './appointments.style.css'

const DefaultAppointmentForm = {
  doctors_id: null,
  patients_id: null,
}
const Appointments = () => {
  const { user } = useContext(AuthContext)
  const { addAppointment } = useContext(AppointmentContext)
  const [date, setDate] = useState(changeDateToIsoFormat(new Date()))
  const [currentDoctorDropdown, setCurrentDoctorDropdown] = useState(null)
  const [appointmentSlider, setAppointmentSlider] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState(DefaultAppointmentForm)
  const [doctorsInputValue, setDoctorsInputValue] = useState('')
  const [patientsInputValue, setPatientsInputValue] = useState('')
  const [doctorsArr, setDoctorsArr] = useState([])
  const [patientsArr, setPatientsArr] = useState([])

  const handleSubmit = () => {
    addAppointment(appointmentForm)
    setAppointmentSlider(false)
  }

  const handleDoctorFetch = useCallback(
    debounce(async (value) => {
      const token = getTokenFromLocalStorage()
      if (!token) return
      const { data } = await axios.get(
        `http://localhost:3000/users/has/${value}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      setDoctorsArr(data)
    }, 200),
    []
  )

  const handleChangeDoctors = (event) => {
    const { value } = event.target
    setDoctorsInputValue(value)
    if (value === '') {
      setDoctorsArr([])
      return
    }
    handleDoctorFetch(value)
  }

  const handlePatientsFetch = useCallback(
    debounce(async (value) => {
      const token = getTokenFromLocalStorage()
      if (!token) return
      const { data } = await axios.get(
        `http://localhost:3000/patients/has/${value}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      setPatientsArr(data)
    }, 200),
    []
  )

  const handleChangePatients = (event) => {
    const { value } = event.target
    setPatientsInputValue(value)
    if (value === '') {
      setPatientsArr([])
      return
    }
    handlePatientsFetch(value)
  }
  return (
    <div className='AppointmentContainer'>
      <AppointmentFilter
        date={date}
        setDate={setDate}
        currentDropdown={currentDoctorDropdown}
        handleDoctorsDropdown={setCurrentDoctorDropdown}
      />
      <AppointmentList
        date={date}
        currentDropdownItem={currentDoctorDropdown}
      />

      <LeftSlideBar open={appointmentSlider}>
        <div className='AppointmentAddContainer'>
          <div className='Appointment-sidebar-heading'>
            Scheduling Appointment
          </div>
          <Completion
            onChange={handleChangeDoctors}
            label='Doctors'
            data={doctorsArr}
            setCurrentItems={setAppointmentForm}
            extractData={{ key1: 'doctors_id', key2: 'uid' }}
            columns={['displayname', 'departmentname']}
            currentItems={appointmentForm}
            value={doctorsInputValue}
            setInputValue={setDoctorsInputValue}
            currentColumn='displayname'
          />

          <br />
          <Completion
            onChange={handleChangePatients}
            label='Patients'
            data={patientsArr}
            setCurrentItems={setAppointmentForm}
            extractData={{ key1: 'patients_id', key2: 'id' }}
            columns={['name', 'age']}
            currentItems={appointmentForm}
            value={patientsInputValue}
            setInputValue={setPatientsInputValue}
            currentColumn='name'
          />

          <div className='Appointments-add-btn'>
            <ButtonPrime text='Add' onClick={handleSubmit} />
          </div>
        </div>
      </LeftSlideBar>

      {user.is_organisation && (
        <button
          className='addManager-btn'
          onClick={() => setAppointmentSlider(!appointmentSlider)}
        >
          <span className='addManager-btn-icon'>
            <MdEditCalendar />
          </span>
          <span className='addManger-btn-label'>schedule an appointment</span>
        </button>
      )}
    </div>
  )
}

export default Appointments
