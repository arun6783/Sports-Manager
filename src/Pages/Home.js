import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Home = () => {
  const [clubName, setClubName] = useState(null)
  const [codeValid, setCodeValid] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (code && code.length === 6) {
      // Simulate club data fetching based on code
      fetchClubNameByCode(code)
    }
  }, [searchParams])

  const fetchClubNameByCode = (code) => {
    if ((code = 'Adidda')) {
      setClubName(code)
      setCodeValid(true)
    }
  }

  const handleStartClubNight = () => {
    navigate(`/club-night?code=${clubName}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">
        {clubName ? `Welcome to ${clubName}` : 'Welcome to Club Manager'}
      </h1>
      {codeValid ? (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleStartClubNight}
        >
          Start Club Night
        </button>
      ) : (
        <p className="text-lg mb-8 text-center">
          Manage your club effortlessly with our comprehensive tools.
        </p>
      )}
    </div>
  )
}

export default Home
