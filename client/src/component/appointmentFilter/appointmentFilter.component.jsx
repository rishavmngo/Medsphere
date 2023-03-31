import './appointmentFilter.style.css'
import { BsChevronDown } from 'react-icons/bs'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { useContext, useEffect, useRef, useState } from 'react'
import { changeDateToIsoFormat } from '../../utils/dates.utils'
import { Calendar } from 'react-calendar'
import { AuthContext } from '../../context/auth.context'
const AppointmentFilter = ({ date, setDate }) => {
  const { user } = useContext(AuthContext)
  const appointmentDropdownRef = useRef(null)
  const appointmentDatepickerRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [openCalenderPopup, setCalenderPopup] = useState(false)

  const onChange = (date) => {
    setDate(changeDateToIsoFormat(date))
  }

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
            <span className='Dropdown-label-text'>All Doctors </span>
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
              <span className='Dropdown-list-item'>All Doctors</span>
              <span className='Dropdown-list-item'>Dr Utkarsh Yadav</span>
              <span className='Dropdown-list-item'>Dr Sachin Chaubey</span>
              <span className='Dropdown-list-item'>Dr Gaurav Mishra</span>
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
