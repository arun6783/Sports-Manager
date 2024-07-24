import React, { useState } from 'react'
import Button from '../components/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      alert('Login successful!')
    } else {
      const errorData = await response.json()
      alert(`Login failed: ${errorData.message}`)
    }
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold mb-4 text-center">Sign In</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Email address</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-gray-700">
              Remember me
            </label>
          </div>
          <a href="/forgot-password" className="text-blue-500">
            Forgot password?
          </a>
        </div>
        <Button onClick={handleLogin}>Sign In</Button>
        <div className="text-center mt-4">
          <p>
            Not a member?{' '}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
          <p className="mt-2">or sign in with:</p>
          <Button
            onClick={handleGoogleLogin}
            className="bg-red-500 flex items-center justify-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21.35 11.1h-8.9v2.95h5.1c-.45 1.4-1.5 2.5-2.85 3.1v2.6h4.65c2.7-2.4 4.25-5.95 4.25-9.7 0-1.3-.15-2.5-.45-3.65z"
                fill="#4285f4"
              />
              <path
                d="M12.45 21c2.35 0 4.3-.8 5.75-2.1l-2.85-2.6c-.75.5-1.7.8-2.9.8-2.25 0-4.15-1.55-4.8-3.65H4.7v2.7c1.5 3 4.6 5.1 7.75 5.1z"
                fill="#34a853"
              />
              <path
                d="M7.65 13.55c-.3-.85-.45-1.75-.45-2.7s.15-1.85.45-2.7v-2.7h-3.5c-.7 1.3-1.1 2.7-1.1 4.35s.4 3.05 1.1 4.35z"
                fill="#fbbc05"
              />
              <path
                d="M12.45 4.8c1.3 0 2.4.45 3.3 1.35l2.45-2.45c-1.6-1.5-3.75-2.4-5.75-2.4-3.15 0-6.25 1.85-7.75 5.1l2.85 2.7c.6-2.1 2.55-3.65 4.8-3.65z"
                fill="#ea4335"
              />
            </svg>
            Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
