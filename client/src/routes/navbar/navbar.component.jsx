import './navbar.style.css'
import { IoIosArrowDown } from 'react-icons/io'
const Navbar = () => {
  return (
    <>
      <div className='Navbar-container'>
        <div className='app-container'>
          <div className='Navbar-title'>Medsphere</div>
          <div className='Account'>
            <div className='Account-details'>
              <div className='Account-pic'></div>
              <div className='Account-name'>Dr. Rishav Raj</div>
            </div>
            <div className='dropdown-btn'>
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
