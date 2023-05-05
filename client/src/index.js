import ReactDom from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth.context'
import PatientsProvider from './context/patients.context'
import DoctorsProvider from './context/doctors.context'
import DepartmentProvider from './context/department.context'
import AppointmentProvider from './context/appointments.context'
import MedicineProvider from './context/inventory.context'
import PrescriptionProvider from './context/prescription.context'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <DoctorsProvider>
      <PatientsProvider>
        <DepartmentProvider>
          <AppointmentProvider>
            <MedicineProvider>
              <PrescriptionProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </PrescriptionProvider>
            </MedicineProvider>
          </AppointmentProvider>
        </DepartmentProvider>
      </PatientsProvider>
    </DoctorsProvider>
  </AuthProvider>
)
