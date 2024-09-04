import React from 'react'
import { useClub } from '../Context/ClubContext'

const Footer = () => {
  const { clubName } = useClub()

  return (
    <footer className="bg-gray-700 text-white text-center absolute bottom-0 w-full">
      <p>
        &copy; {new Date().getFullYear()} {clubName || 'My Badminton Club'}
      </p>
    </footer>
  )
}

export default Footer
