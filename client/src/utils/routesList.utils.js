import { FaCalendarCheck, FaHospitalUser, FaHistory } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
const routesList = {
  dashboard: {
    id: 1,
    name: 'Dashboard',
    path: '/',
    icon: <MdSpaceDashboard />,
  },
  appointments: {
    id: 2,
    name: 'Appointments',
    path: '/appointments',
    icon: <FaCalendarCheck />,
  },

  patients: {
    id: 3,
    name: 'Patients',
    path: '/patients',
    icon: <FaHospitalUser />,
  },
  history: {
    id: 4,
    name: 'History',
    path: '/history',
    icon: <FaHistory />,
  },
}

export default routesList
