import { FiLogOut } from 'react-icons/fi'
import { CiUser } from 'react-icons/ci'
import NavDropdownItem from '../navDropdownItem/navDropdownItem.component'
import './navDropDown.style.css'
import { useNavigate } from 'react-router-dom'
const NavDropdown = ({ logout, innerRef, show }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`NavDropdown-container ${show ? 'show' : ''}`}
      ref={innerRef}
    >
      <div className='NavDropdown-list'>
        <div className='NavDropdown-list-section'>
          <NavDropdownItem label='profile' icon={<CiUser />} />
        </div>
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
