import React from 'react'
import { useClub } from '../Context/ClubContext'

const Footer = () => {
  const { clubName } = useClub()

  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} {clubName || 'My Badminton Club'}
        </p>
      </div>
    </footer>
  )
}

export default Footer
