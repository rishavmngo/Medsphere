import axios from 'axios'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
import { MdEditCalendar } from 'react-icons/md'
import AppointmentFilter from '../../component/appointmentFilter/appointmentFilter.component'
import AppointmentList from '../../component/appointmentList/appointmentList.component'
import Completion from '../../component/completion/completion.component'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import { changeDateToIsoFormat } from '../../utils/dates.utils'
import './appointments.style.css'

const DefaultAppointmentForm = {
  doctors_id: null,
  patients_id: null,
}
const Appointments = () => {
  const [date, setDate] = useState(changeDateToIsoFormat(new Date()))
  const [currentDoctorDropdown, setCurrentDoctorDropdown] = useState(null)
  const [appointmentSlider, setAppointmentSlider] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState(DefaultAppointmentForm)
  const [inputValue, setInputValue] = useState('')
  const [datas, setData] = useState([])
  let timeoutId = null
  const handleDataFetch = useCallback(
    debounce(async (value) => {
      const { data } = await axios.get(
        `http://localhost:3000/appointments/has/${value}`
      )
      setData(data)
    }, 200),
    []
  )

  const handleChange = (event) => {
    const { value } = event.target
    setInputValue(value)
    if (value === '') {
      setData([])
      return
    }
    handleDataFetch(value)
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
          <div onClick={() => console.log(appointmentForm)}>Submit</div>
          <Completion
            onChange={handleChange}
            label=''
            data={datas}
            setCurrentItems={setAppointmentForm}
            extractData={{ key1: 'doctors_id', key2: 'uid' }}
            columns={['displayname', 'departmentname']}
            currentItems={appointmentForm}
            value={inputValue}
            setInputValue={setInputValue}
          />

          {/* <Completion */}
          {/*   onChange={handleChange} */}
          {/*   label='Patients' */}
          {/*   data={datas} */}
          {/*   setCurrentItems={setAppointmentForm} */}
          {/*   extractData={{ key1: 'doctors_id', key2: 'uid' }} */}
          {/*   columns={['displayname', 'departmentname']} */}
          {/*   currentItems={appointmentForm} */}
          {/*   value={inputValue} */}
          {/*   setInputValue={setInputValue} */}
          {/* /> */}
        </div>
      </LeftSlideBar>

      <button
        className='addManager-btn'
        onClick={() => setAppointmentSlider(!appointmentSlider)}
      >
        <span className='addManager-btn-icon'>
          <MdEditCalendar />
        </span>
        <span className='addManger-btn-label'>schedule an appointment</span>
      </button>
    </div>
  )
}

export default Appointments
