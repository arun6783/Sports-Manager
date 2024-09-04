// import React from 'react'
// import { Link } from 'react-router-dom'

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-4xl font-bold mb-4">Welcome to Club Manager</h1>
//       <p className="text-lg mb-8 text-center">
//         Manage your club effortlessly with our comprehensive tools.
//       </p>
//       <div className="flex flex-col md:flex-row items-center justify-center gap-4">
//         <Link to="/setup-club">
//           <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Setup Club
//           </button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Home

import React, { useState } from 'react'

const Home = () => {
  const [clubResponse, setClubResponse] = useState('')

  const getClub = async () => {
    try {
      const response = await fetch('/api/getClub?clubName=Adidda')
      if (!response.ok) {
        if (response.status === 404) {
          setClubResponse('Club not found')
        } else {
          throw new Error('Network response was not ok')
        }
      } else {
        const data = await response.json()
        setClubResponse(JSON.stringify(data, null, 2))
      }
    } catch (error) {
      console.error('Failed to fetch club:', error)
      setClubResponse('Failed to fetch club data')
    }
  }

  return (
    <div className="home-page">
      <h1>Welcome to the Club Manager</h1>

      <button onClick={getClub} className="club-fetch-button">
        Get Club with Name 'Adidda'
      </button>
      {clubResponse && (
        <pre className="club-response">Club Response: {clubResponse}</pre>
      )}
    </div>
  )
}

export default Home
