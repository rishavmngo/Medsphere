import ReactDom from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth.context'
import PatientsProvider from './context/patients.context'
import DoctorsProvider from './context/doctors.context'
import DepartmentProvider from './context/department.context'
import AppointmentProvider from './context/appointments.context'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <DoctorsProvider>
      <PatientsProvider>
        <DepartmentProvider>
          <AppointmentProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AppointmentProvider>
        </DepartmentProvider>
      </PatientsProvider>
    </DoctorsProvider>
  </AuthProvider>
)
