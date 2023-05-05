import Dashboard from './routes/dashboard/dashboard.component'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Patients from './routes/patients/patients.component'
import Appointments from './routes/appointments/appointments.component'
import History from './routes/history/history.component'
import './app.css'
import { useContext, useEffect, useState } from 'react'
import Authentication from './routes/authentication/authentication.component'
import StaticComp from './routes/staticComp/staticComp.component'
import { AuthContext } from './context/auth.context'
import Manage from './routes/manage/manage.component'
import FullScreen from './component/fullscreen/fullscreen.component'
import Prescription from './component/prescription/prescription.component'
import { ClipLoader } from 'react-spinners'
import InventoryPage from './routes/inventory/inventory.component'

function RequireAuth(Component, props) {
  const { user } = useContext(AuthContext)
  let admin = true
  if (props.org) admin = user && user.is_organisation
  if (user && admin) return <Component />
  else if (!user) return <Authentication />
  else return <NotFound />
}

function NotFound() {
  // const navigate = useNavigate()
  return (
    <div>
      Service not found
      {/* <button onClick={() => navigate('/')}>click</button> */}
    </div>
  )
}

function Inventory() {
  return <div>Inventory</div>
}
const App = () => {
  const { autoLogin } = useContext(AuthContext)

  useEffect(() => {
    autoLogin()
  }, [])

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
        <Route
          path='prescription'
          // Component={() => RequireAuth(<FullScreen></FullScreen>, { org: true })}
          element={
            <FullScreen>
              <Prescription />
            </FullScreen>
          }
        />
      </Route>
      <Route path='auth' element={<Authentication />} />
    </Routes>
  )
}
const PrivateRoute = () => {
  const { user } = useContext(AuthContext)

  console.log('user', user)
  return user ? <Outlet /> : <Navigate to='/auth' />
}
const ProtectedRoute = ({ children, auth }) => {
  if (!auth) {
    return <Authentication />
  }

  return children
}
const AdminRoutes = ({ admin }) => {
  return admin ? <Outlet /> : <NotFound />
}
const Kpp = () => {
  const { autoLogin, user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  console.log(user)

  useEffect(() => {
    autoLogin().then(() => {
      setIsLoading(false)
    })
  }, [])
  if (isLoading) {
    return (
      <div className='spinner'>
        <ClipLoader
          loading={isLoading}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path='/'
        Component={() => (
          <ProtectedRoute auth={!!user}>
            <StaticComp />
          </ProtectedRoute>
        )}
      >
        <Route path='/' element={user && <Dashboard />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/history' element={<History />} />
        <Route
          path='/prescription/:prescriptionId'
          element={
            <FullScreen>
              <Prescription />
            </FullScreen>
          }
        />
        <Route element={<AdminRoutes admin={user && user.is_organisation} />}>
          <Route path='/manage' element={<Manage />} />
          <Route path='/inventory' element={<InventoryPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
      {/* <Route path='/auth' element={<Authentication />}></Route> */}
    </Routes>
  )
}

export default Kpp

{
  /* </Route> */
}
