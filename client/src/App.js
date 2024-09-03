// src/App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import RegisterClub from './components/RegisterClub'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Badminton Club Manager</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-club" element={<RegisterClub />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
