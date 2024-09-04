import React, { useState, useEffect } from 'react'
import WaitingBay from '../components/WaitingBay'
import Court from '../components/Court'

const ClubNight = ({ rules, numCourts }) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [players, setPlayers] = useState([])
  const [courts, setCourts] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAddPlayer = (newPlayers) => {
    setPlayers([...players, ...newPlayers])
  }

  const handleAddCourt = () => {
    const newCourt = { id: courts.length + 1, players: [], enabled: true }
    setCourts([...courts, newCourt])
  }

  const handleRemoveCourt = (courtId) => {
    setCourts(courts.filter((court) => court.id !== courtId))
  }

  return (
    <div className="p-4">
      <h1>Club Night</h1>
      <p>Time Elapsed: {elapsedTime} seconds</p>
      <WaitingBay players={players} onAssignCourt={handleAddPlayer} />
      <div className="flex flex-wrap">
        {courts.map((court) => (
          <Court key={court.id} courtData={court} />
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleAddCourt}
      >
        Add Court
      </button>
    </div>
  )
}

export default ClubNight
