import React, { useState } from 'react'
import Button from '../components/Button'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleForgotPassword = async () => {
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      alert('Password reset email sent!')
    } else {
      const errorData = await response.json()
      alert(`Failed to send reset email: ${errorData.message}`)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold mb-4 text-center">Forgot Password</h3>
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
        <Button onClick={handleForgotPassword}>Reset Password</Button>
        <p className="text-right mt-4">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
