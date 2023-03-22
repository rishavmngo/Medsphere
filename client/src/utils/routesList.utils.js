import {
  FaCalendarCheck,
  FaHospitalUser,
  FaHistory,
  FaUsersCog,
  FaTruck,
} from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
export const generalRoutesList = {
  dashboard: {
    id: 1,
    name: 'Dashboard',
    path: '/',
    icon: <MdSpaceDashboard />,
    forAdmin: false,
  },
  appointments: {
    id: 2,
    name: 'Appointments',
    path: '/appointments',
    icon: <FaCalendarCheck />,
    forAdmin: false,
  },

  patients: {
    id: 3,
    name: 'Patients',
    path: '/patients',
    icon: <FaHospitalUser />,
    forAdmin: false,
  },
  history: {
    id: 4,
    name: 'History',
    path: '/history',
    icon: <FaHistory />,
    forAdmin: false,
  },
}

export const adminRouteList = {
  manage: {
    id: 5,
    name: 'Manage',
    path: '/manage',
    icon: <FaUsersCog />,
    forAdmin: true,
  },
  inventory: {
    id: 6,
    name: 'Inventory',
    path: '/inventory',
    icon: <FaTruck />,
    forAdmin: true,
  },
}
