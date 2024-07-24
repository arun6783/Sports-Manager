import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Todo from './Todo'
const App = () => {
  return (
    // <Router>
    //   <Navbar isAuthenticated={false} />
    //   <Routes>
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/contact" element={<Contact />} />
    //     <Route path="/forgot-password" element={<ForgotPassword />} />
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </Router>

    <div>
      <>
        <h1>Todos</h1>
        <Todo title="1st todo" />
        <Todo title="2nd todo" />
        <Todo title="3rd todo" />
        <Todo title="4th todo" />
      </>
    </div>
  )
}

export default App
