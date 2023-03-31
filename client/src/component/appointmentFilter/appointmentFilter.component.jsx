import './appointmentFilter.style.css'
import { BsChevronDown } from 'react-icons/bs'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { useContext, useEffect, useRef, useState } from 'react'
import { changeDateToIsoFormat } from '../../utils/dates.utils'
import { Calendar } from 'react-calendar'
import { AuthContext } from '../../context/auth.context'
import { DoctorsContext } from '../../context/doctors.context'
const AppointmentFilter = ({
  date,
  setDate,
  currentDropdown,
  handleDoctorsDropdown,
}) => {
  const { user } = useContext(AuthContext)
  const { getDoctorsForOrg, doctors } = useContext(DoctorsContext)
  const appointmentDropdownRef = useRef(null)
  const appointmentDatepickerRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [openCalenderPopup, setCalenderPopup] = useState(false)

  const onChange = (date) => {
    setDate(changeDateToIsoFormat(date))
  }

  useEffect(() => {
    getDoctorsForOrg()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      const isAddDepartmentBtn =
        event.target.classList.contains('addManager-btn')
      if (
        appointmentDatepickerRef.current &&
        !appointmentDatepickerRef.current.contains(event.target)
      ) {
        setCalenderPopup(false)
      }

      if (
        appointmentDropdownRef.current &&
        !appointmentDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [appointmentDatepickerRef])
  return (
    <div className='AppointmentFilter-container'>
      {user && user.is_organisation && (
        <div className='Dropdown'>
          <span
            className='Dropdown-label'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className='Dropdown-label-text'>
              {currentDropdown ? 'Dr ' + currentDropdown.name : 'All Doctors'}
            </span>
            <span
              className={`Dropdown-label-icon ${
                dropdownOpen ? 'dropdownopen' : ''
              }`}
            >
              <BsChevronDown />
            </span>
          </span>
          {dropdownOpen && (
            <div className='Dropdown-list' ref={appointmentDropdownRef}>
              <span
                className='Dropdown-list-item'
                onClick={() => {
                  handleDoctorsDropdown(null)
                  setDropdownOpen(false)
                }}
              >
                All Doctors
              </span>
              {doctors.map((doctor) => {
                return (
                  <span
                    className='Dropdown-list-item'
                    key={doctor.uid}
                    onClick={() => {
                      handleDoctorsDropdown({
                        id: doctor.uid,
                        name: doctor.displayname,
                      })
                      setDropdownOpen(false)
                    }}
                  >
                    Dr {doctor.displayname}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      )}
      <div className='DatePicker'>
        <div
          className='DatePicker-label'
          onClick={() => setCalenderPopup(true)}
        >
          <span className='DatePicker-label-text'>{date}</span>

          <span className='DatePicker-label-icon'>
            <AiTwotoneCalendar />
          </span>
        </div>

        {openCalenderPopup && (
          <div className='calender' ref={appointmentDatepickerRef}>
            <Calendar onChange={onChange} value={date} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentFilter
