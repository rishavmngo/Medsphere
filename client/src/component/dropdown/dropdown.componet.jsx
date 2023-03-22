import { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

import './dropdown.style.css'

const Dropdown = ({
  values,
  currentItem,
  setCurrentItem,
  maxWidth = '250px',
  minWidth = '250px',
}) => {
  const dropdownRef = useRef()
  const [dropdownList, setDropdownList] = useState(values)
  // const [currentItem, setCurrentItem] = useState(0)
  const [showDropDown, setDropDown] = useState(false)
  const currentItemStyle = {
    minWidth: minWidth,
    maxWidth: maxWidth,
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      const isDropDownContainer =
        event.target.classList.contains('dropdown-container')

      if (!isDropDownContainer && !dropdownRef.current.contains(event.target)) {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [dropdownRef])

  const handleClick = (event) => {
    setCurrentItem(event.target.id)
    setDropDown(false)
  }
  return (
    <div
      className='dropdown-container'
      onClick={() => setDropDown(!showDropDown)}
    >
      <div className='current-item' style={currentItemStyle}>
        {dropdownList[currentItem]}
      </div>
      <div className='dropdown-icon'>
        <FaChevronDown />
      </div>
      <div
        ref={dropdownRef}
        className={`dropdown-list-container  ${showDropDown ? 'show' : ''}`}
      >
        {dropdownList.map((item, index) => {
          return (
            <div
              key={index}
              id={index}
              className='dropdown-list-item'
              onClick={handleClick}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dropdown
