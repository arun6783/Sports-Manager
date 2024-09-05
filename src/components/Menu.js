import React, { useState } from 'react'

export default function Menu({ children }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const closeMenu = () => {
    setDropdownOpen(false)
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: closeMenu })
    }
    return child
  })

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        Menu
      </button>
      <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
        {childrenWithProps}
      </ul>
    </div>
  )
}
