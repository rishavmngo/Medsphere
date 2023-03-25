const NavDropdownItem = ({ label, icon, onClick }) => {
  return (
    <div className='NavDropdown-list-item' onClick={onClick}>
      <span className='NavDropdown-list-item-icon'>{icon}</span>
      <span className='NavDropdown-list-item-label'>{label}</span>
    </div>
  )
}

export default NavDropdownItem
