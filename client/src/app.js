import Dashboard from './routes/dashboard/dashboard.component'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Patients from './routes/patients/patients.component'
import Appointments from './routes/appointments/appointments.component'
import History from './routes/history/history.component'
import './app.css'
import { useContext, useEffect } from 'react'
import Authentication from './routes/authentication/authentication.component'
import StaticComp from './routes/staticComp/staticComp.component'
import { AuthContext } from './context/auth.context'
import Manage from './routes/manage/manage.component'

function RequireAuth(Component, props) {
  const { user } = useContext(AuthContext)
  let admin = true
  if (props.org) admin = user && user.is_organisation
  if (user && admin) return <Component />
  else if (!user) return <Authentication />
  else return <NotFound />
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      Service not found
      <button onClick={() => navigate('/')}>click</button>
    </div>
  )
}

const App = () => {
  const { autoLogin } = useContext(AuthContext)

  useEffect(() => {
    autoLogin()
  }, [])

  function Inventory() {
    return <div>Inventory</div>
  }
  return (
    <Routes>
      <Route path='/' Component={() => RequireAuth(StaticComp, { org: false })}>
        <Route index Component={() => RequireAuth(Dashboard, { org: false })} />
        <Route
          path='appointments'
          Component={() => RequireAuth(Appointments, { org: false })}
        />

        <Route
          path='patients'
          Component={() => RequireAuth(Patients, { org: false })}
        />
        <Route
          path='history'
          Component={() => RequireAuth(History, { org: false })}
        />
        <Route
          path='manage'
          Component={() => RequireAuth(Manage, { org: true })}
        />
        <Route
          path='inventory'
          Component={() => RequireAuth(Inventory, { org: true })}
        />
      </Route>
      <Route path='auth' element={<Authentication />} />
    </Routes>
  )
}

export default App
