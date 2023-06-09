import './navbar.style.css'
import { BsChevronDown } from 'react-icons/bs'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import NavDropdown from '../../component/navDropDown/navDropDown.component'
import FallBackImage from '../../assets/rishav-pic.jpeg'
const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      const isAddPatientBtn = event.target.classList.contains('Account')
      if (!isAddPatientBtn && !navRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navRef])

  return (
    <>
      <div className='Navbar-container'>
        <NavDropdown
          logout={logout}
          toggle={setDropdownOpen}
          show={dropdownOpen}
          innerRef={navRef}
          admin={user.is_organisation}
        />
        <div className='app-container'>
          <div className='Navbar-title'>Medsphere</div>
          <div
            className='Account'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className='Account-details'>
              <div className='Account-pic'>
                {!user.profile_picture || !user.is_organisation ? (
                  <img src={FallBackImage} />
                ) : (
                  <img
                    src={`http://localhost:3000/static/${user.profile_picture}`}
                  />
                )}
              </div>
              <div className='Account-name'>{`${
                user.is_organisation ? '' : 'Dr. '
              } ${user.displayname}`}</div>
            </div>
            <div className='dropdown-btn'>
              <BsChevronDown />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
