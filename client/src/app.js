import Dashboard from './routes/dashboard/dashboard.component'
import { Route, Routes } from 'react-router-dom'
import Navbar from './routes/navbar/navbar.component'
import Patients from './routes/patients/patients.component'
import Appointments from './routes/appointments/appointments.component'
import History from './routes/history/history.component'
import './app.css'
import { useState } from 'react'
import Authentication from './routes/authentication/authentication.component'
import StaticComp from './routes/staticComp/staticComp.component'

const App = () => {
  const [user, setUser] = useState('ri')
  return (
    <Routes>
      {user ? (
        <Route path='/' element={<StaticComp />}>
          <Route index element={<Dashboard />} />
          <Route path='patients' element={<Patients />} />
          <Route path='appointments' element={<Appointments />} />
          <Route path='history' element={<History />} />
        </Route>
      ) : (
        <Route path='/' element={<Authentication />} />
      )}
    </Routes>
  )
}

export default App
