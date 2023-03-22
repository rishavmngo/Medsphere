import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import LeftSlideBar from '../../component/leftSlideBar/leftSlideBar.component'
import Sidebar from '../../component/sidebar/sidebar.component'
import { StaticCompContext } from '../../context/staticComp.context'
import Navbar from '../navbar/navbar.component'
import './staticComp.style.css'

const StaticComp = () => {
  // const { leftSlideBarOpen } = useContext(StaticCompContext)
  const leftSlideBarOpen = true
  return (
    <div className='StaticComp-container'>
      <Navbar />
      <div className='main-layout'>
        <div className='app-container'>
          <Sidebar />
          <Outlet />
          <LeftSlideBar>
            <div>Doctors</div>
          </LeftSlideBar>
        </div>
      </div>
    </div>
  )
}

export default StaticComp
