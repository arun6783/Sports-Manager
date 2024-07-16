import React, { useState } from 'react'

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
        <input
          type="button"
          value="Sign In"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        />
        <div className="text-center mt-4">
          <p>
            Not a member?{' '}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
          <p className="mt-2">or sign in with:</p>
          <input
            type="button"
            value="Google"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white p-2 rounded mt-4 flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
