import axios from 'axios'

import { debounce } from 'lodash'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MdEditCalendar } from 'react-icons/md'
import AppointmentFilter from '../../component/appointmentFilter/appointmentFilter.component'
import AppointmentList from '../../component/appointmentList/appointmentList.component'
import Completion from '../../component/completion/completion.component'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import Overlay from '../../component/overlay/overlay.component'
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
  const appointmentSliderRef = useRef()
  const appointmentUpdateSliderRef = useRef()
  const { user } = useContext(AuthContext)
  const { addAppointment } = useContext(AppointmentContext)
  const [date, setDate] = useState(changeDateToIsoFormat(new Date()))
  const [currentDoctorDropdown, setCurrentDoctorDropdown] = useState(null)
  const [appointmentSlider, setAppointmentSlider] = useState(false)
  const [appointmentUpdateSlider, setAppointmentUpdateSlider] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState(DefaultAppointmentForm)
  const [doctorsInputValue, setDoctorsInputValue] = useState('')
  const [patientsInputValue, setPatientsInputValue] = useState('')
  const [doctorsArr, setDoctorsArr] = useState([])
  const [patientsArr, setPatientsArr] = useState([])
  const [overlayOpen, setOverlayOpen] = useState(false)

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
    console.log('value', value)
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

  const handleDone = (item) => {
    console.log(item)
    setOverlayOpen(true)
  }
  const handleUpdate = (item) => {
    const { patients_name, doctors_name } = item
    setDoctorsInputValue(doctors_name)
    setPatientsInputValue(patients_name)
    setAppointmentUpdateSlider(true)
  }
  useEffect(() => {
    function handleClickOutside(event) {
      const isAddDepartmentBtn =
        event.target.classList.contains('addManager-btn')
      if (
        appointmentSliderRef.current &&
        !isAddDepartmentBtn &&
        !appointmentSliderRef.current.contains(event.target)
      ) {
        setAppointmentSlider(false)
      }

      if (
        appointmentUpdateSliderRef.current &&
        !appointmentUpdateSliderRef.current.contains(event.target)
      ) {
        setAppointmentUpdateSlider(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [appointmentUpdateSliderRef, appointmentSliderRef])
  return (
    <>
      <div className='AppointmentContainer' id='print'>
        <AppointmentFilter
          date={date}
          setDate={setDate}
          currentDropdown={currentDoctorDropdown}
          handleDoctorsDropdown={setCurrentDoctorDropdown}
        />
        <AppointmentList
          date={date}
          currentDropdownItem={currentDoctorDropdown}
          handleDone={(item) => {
            handleDone(item)
          }}
          Edit={(item) => {
            handleUpdate(item)
          }}
        />

        <LeftSlideBar
          open={appointmentUpdateSlider}
          innerRef={appointmentUpdateSliderRef}
        >
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
              <ButtonPrime text='Update' onClick={handleSubmit} />
            </div>
          </div>
        </LeftSlideBar>
        <LeftSlideBar open={appointmentSlider} innerRef={appointmentSliderRef}>
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
        {overlayOpen && (
          <Overlay>
            <div className='overlay-children-container'>
              <div className='department-overlay-msg'>
                Mark appointment as completed?
              </div>
              <div className='department-overlay-btns'>
                <div
                  className='department-overlay-btn'
                  onClick={() => setOverlayOpen(false)}
                >
                  No
                </div>
                <div
                  className='department-overlay-btn btn-yes'
                  onClick={() => {}}
                >
                  Yes
                </div>
              </div>
            </div>
          </Overlay>
        )}

        {user.is_organisation && (
          <button
            className='addManager-btn'
            onClick={() => {
              setDoctorsInputValue('')
              setPatientsInputValue('')
              setAppointmentSlider(!appointmentSlider)
            }}
          >
            <span className='addManager-btn-icon'>
              <MdEditCalendar />
            </span>
            <span className='addManger-btn-label'>schedule an appointment</span>
          </button>
        )}
      </div>
    </>
  )
}

export default Appointments
