import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ClubProvider } from './Context/ClubContext'
import Login from './Pages/Login.js'
import Home from './Pages/Home'
import SetupClub from './Pages/SetupClub'
import AddPlayers from './Pages/AddPlayers'
import ClubNight from './Pages/ClubNight'
import SetupRules from './Pages/SetupRules'
import Message from './components/Message'

const App = () => {
  return (
    <ClubProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup-club" element={<SetupClub />} />
          <Route path="/add-players" element={<AddPlayers />} />
          <Route path="/club-night" element={<ClubNight />} />
        </Routes>
        <Message />
      </Router>
    </ClubProvider>
  )
}

export default App
