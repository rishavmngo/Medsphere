import { FiLogOut } from 'react-icons/fi'
import { CiUser } from 'react-icons/ci'
import NavDropdownItem from '../navDropdownItem/navDropdownItem.component'
import './navDropDown.style.css'
import { useNavigate } from 'react-router-dom'
import { FaCog } from 'react-icons/fa'
const NavDropdown = ({ admin, logout, innerRef, show, toggle }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`NavDropdown-container ${show ? 'show' : ''}`}
      ref={innerRef}
    >
      <div className='NavDropdown-list'>
        {admin && (
          <div className='NavDropdown-list-section'>
            <NavDropdownItem
              label='Settings'
              icon={<FaCog />}
              onClick={() => {
                navigate('/settings')
                toggle(false)
              }}
            />
          </div>
        )}
        <div className='NavDropdown-list-section'>
          <NavDropdownItem
            label='logout'
            icon={<FiLogOut />}
            onClick={() => {
              logout()
              navigate('/')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NavDropdown
