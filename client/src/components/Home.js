// src/components/Home.js
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Badminton Club Manager</h2>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home
