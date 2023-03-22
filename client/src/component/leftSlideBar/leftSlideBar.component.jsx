import { useContext } from 'react'
import { StaticCompContext } from '../../context/staticComp.context'
import './leftSlideBar.style.css'
const LeftSlideBar = ({ children }) => {
  const { leftSlideBarOpen } = useContext(StaticCompContext)
  return (
    <div
      className={`leftSlideBar-container ${
        leftSlideBarOpen ? 'show-slidebar' : ''
      } <}`}
    >
      {children}
    </div>
  )
}

export default LeftSlideBar
