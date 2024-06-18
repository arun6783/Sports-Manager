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
    <div className="relative">
      <button className="drawer-button p-2 m-2" onClick={toggleDropdown}>
        <div className="drawer-icon"></div>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu absolute right-0 mt-6 p-4 m-2 py-2 bg-white shadow-xl rounded">
          {childrenWithProps}
        </div>
      )}
    </div>
  )
}
