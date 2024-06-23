import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import RegistrationForm from '../components/RegistrationForm'

const Login = () => {
  const navigate = useNavigate()
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  const handleLoginSuccess = (response) => {
    console.log('Login Success: currentUser:', response)
    // Handle user login and token here
    navigate('/home')
  }

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error)
  }

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
      <button onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
        {showRegistrationForm ? 'Hide Registration' : 'Register'}
      </button>
      {showRegistrationForm && <RegistrationForm />}
    </div>
  )
}

export default Login
