import './sidebar.style.css'
import SidebarItem from '../sidebarItems/sidebarItems.component'
import {
  adminRouteList,
  generalRoutesList,
} from '../../utils/routesList.utils.js'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const Sidebar = () => {
  const { user } = useContext(AuthContext)

  console.log()
  return (
    <div className='sidebar-container'>
      <div className='RoutesList'>
        {Object.keys(generalRoutesList).map((route) => {
          const { id, name, icon, path, forAdmin } = generalRoutesList[route]
          if (forAdmin) {
            if (!user.is_organisation) return
          }
          return (
            <SidebarItem
              key={id}
              routeName={name}
              iconComponent={icon}
              path={path}
            />
          )
        })}
        {user.is_organisation &&
          Object.keys(adminRouteList).map((route) => {
            const { id, name, icon, path, forAdmin } = adminRouteList[route]
            if (forAdmin) {
              if (!user.is_organisation) return
            }
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
