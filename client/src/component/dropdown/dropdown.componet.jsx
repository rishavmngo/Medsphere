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
    const { id } = event.target
    const value = event.target.dataset.value
    setCurrentItem({ value, id: parseInt(id) })
    setDropDown(false)
  }
  return (
    <div
      className='dropdown-container'
      onClick={() => setDropDown(!showDropDown)}
    >
      <div className='current-item' style={currentItemStyle}>
        {currentItem.value}
      </div>
      <div className='dropdown-icon'>
        <FaChevronDown />
      </div>
      <div
        ref={dropdownRef}
        className={`dropdown-list-container  ${showDropDown ? 'show' : ''}`}
      >
        {values.map(({ id, name }) => {
          return (
            <div
              key={id}
              id={id}
              data-value={name}
              className='dropdown-list-item'
              onClick={handleClick}
            >
              {name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dropdown
