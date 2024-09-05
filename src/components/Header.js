import React from 'react'
import Menu from './Menu'

function Header({ menuItems }) {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Badminton Pegboard
        </a>
        <Menu>{menuItems}</Menu>
      </div>
    </header>
  )
}

export default Header
