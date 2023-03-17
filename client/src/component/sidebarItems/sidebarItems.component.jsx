import './sidebarItems.style.css'
import { NavLink } from 'react-router-dom'
const SidebarItem = ({ routeName, iconComponent, active, path }) => {
  return (
    <NavLink className='route-item ' to={path}>
      <div className='route-item-icon'>{iconComponent}</div>
      <div className='route-item-name'>{routeName}</div>
    </NavLink>
  )
}

export default SidebarItem
