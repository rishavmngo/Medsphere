import './navbar.style.css'
import { IoIosArrowDown } from 'react-icons/io'
import { BsChevronDown } from 'react-icons/bs'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
const Navbar = () => {
  const { logout, user } = useContext(AuthContext)
  return (
    <>
      <div className='Navbar-container'>
        <div className='app-container'>
          <div className='Navbar-title'>Medsphere</div>
          <div className='Account'>
            <div className='Account-details' onClick={() => logout()}>
              <div className='Account-pic'></div>
              <div className='Account-name'>{`${
                user.is_organisation ? '' : 'Dr. '
              } ${user.displayname}`}</div>
            </div>
            <div className='dropdown-btn'>
              {/* <IoIosArrowDown /> */}
              <BsChevronDown />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
