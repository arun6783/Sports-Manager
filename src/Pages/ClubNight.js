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
    <div className="container">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Club Night</h4>
          <p className="text-muted">Time Elapsed: {elapsedTime} seconds</p>
        </div>
        <div className="card-body">
          <WaitingBay players={players} onAssignCourt={handleAddPlayer} />
          <div className="row">
            {courts.map((court) => (
              <div key={court.id} className="col-md-6 col-lg-4">
                <Court courtData={court} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleAddCourt}>
            Add Court
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClubNight
