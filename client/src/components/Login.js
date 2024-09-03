// src/components/Login.js
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, googleAuthProvider } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Alert } from 'react-bootstrap'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login
