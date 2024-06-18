import React, { useState } from 'react'
import Modal from './Modal'
import Menu from './Menu'
function Header({ menuItems }) {
  return (
    <header className="bg-blue-600 text-white text-left p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Badminton Pegboard</h1>
      <Menu> {menuItems} </Menu>
    </header>
  )
}

export default Header
