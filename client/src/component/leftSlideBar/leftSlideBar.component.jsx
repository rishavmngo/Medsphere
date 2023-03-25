import { useContext } from 'react'
import { StaticCompContext } from '../../context/staticComp.context'
import './leftSlideBar.style.css'
const LeftSlideBar = ({ children, open, innerRef }) => {
  return (
    <div
      ref={innerRef}
      className={`leftSlideBar-container ${open ? 'show-slidebar' : ''} <}`}
    >
      {children}
    </div>
  )
}

export default LeftSlideBar
