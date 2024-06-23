import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Login from './Pages/Login.js'
import Home from './Pages/Home'
import SetupClub from './Pages/SetupClub'
import AddPlayers from './Pages/AddPlayers'
import SetupRules from './Pages/SetupRules'
import { useMessage } from './Context/MessageContext'
import Message from './components/Message'

const App = () => {
  const { showMessage } = useMessage()
  const isLoggedIn = !!localStorage.getItem('token') // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setup-club" element={<SetupClub />} />
        <Route path="/add-players" element={<AddPlayers />} />
        <Route path="/setup-rules" element={<SetupRules />} />
      </Routes>
      <Message />
    </Router>
  )
}

export default App
