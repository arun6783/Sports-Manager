import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

const Home = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success: currentUser:', response)
    // Handle user login and token here
  }

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Club Manager</h1>
      <p className="text-lg mb-8 text-center">
        Manage your club effortlessly with our comprehensive tools. From adding
        players to setting up rules, everything you need is here. Get started by
        logging in or registering your account.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login with Google
            </button>
          )}
        />
        <Link to="/register">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
