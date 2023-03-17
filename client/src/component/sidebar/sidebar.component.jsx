import './sidebar.style.css'
import SidebarItem from '../sidebarItems/sidebarItems.component'
import routesList from '../../utils/routesList.utils.js'

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <div className='RoutesList'>
        {Object.keys(routesList).map((route) => {
          const { id, name, icon, path } = routesList[route]
          return (
            <SidebarItem
              key={id}
              routeName={name}
              iconComponent={icon}
              path={path}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
