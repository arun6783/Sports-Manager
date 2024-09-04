import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistrationForm from '../components/RegistrationForm'

const Login = () => {
  const navigate = useNavigate()
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
        {showRegistrationForm ? 'Hide Registration' : 'Register'}
      </button>
      {showRegistrationForm && <RegistrationForm />}
    </div>
  )
}

export default Login
