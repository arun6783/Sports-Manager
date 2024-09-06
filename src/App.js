import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ClubProvider } from './Context/ClubContext'
import Home from './Pages/Home'
import SetupClub from './Pages/SetupClub'
import ClubNight from './Pages/ClubNight'

import Message from './components/Message'

const App = () => {
  return (
    <ClubProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup-club" element={<SetupClub />} />

          <Route path="/club-night" element={<ClubNight />} />
        </Routes>
        <Message />
      </Router>
    </ClubProvider>
  )
}

export default App
