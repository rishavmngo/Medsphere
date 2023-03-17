import { Outlet } from 'react-router-dom'
import Sidebar from '../../component/sidebar/sidebar.component'
import Navbar from '../navbar/navbar.component'
import './staticComp.style.css'

const StaticComp = () => {
  return (
    <div className='StaticComp-container'>
      <Navbar />
      <div className='main-layout'>
        <div className='app-container'>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default StaticComp
