import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto md:h-16" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">
            Contact Us
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="text-gray-300 hover:text-white">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            id="menu-toggle"
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
