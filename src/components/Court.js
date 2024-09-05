import React, { useState, useEffect } from 'react'

function Court({
  courtData,
  onEndGame,
  onEnableCourt,
  onDisableCourt,
  isCourtSelected,
  setIsCourtSelected,
}) {
  const hideButton = courtData.players.length === 0 ? 'd-none' : 'd-block'
  const showButton = courtData.players.length === 0 ? 'd-block' : 'd-none'

  const [timer, setTimer] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showTimeElapsed, setShowTimeElapsed] = useState(false)

  const handleStartGame = () => {
    setShowTimeElapsed(true)
    setTimer(
      setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    )
  }

  const handleEndGame = () => {
    onEndGame(courtData.id)
    setShowTimeElapsed(false)
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [timer])

  return (
    <div
      className={`card mb-4 shadow-sm ${
        isCourtSelected ? 'border-primary' : ''
      }`}
      onClick={() => {
        setIsCourtSelected(courtData)
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{courtData.courtName}</h5>
        {showTimeElapsed && (
          <p className="card-text">Time elapsed: {elapsedTime} seconds</p>
        )}
        <div className="card-text">
          {courtData.players.map((player) => (
            <span className="badge bg-secondary me-2" key={player.name}>
              {player.name}
            </span>
          ))}
        </div>
        {courtData.enabled && isCourtSelected && (
          <div className="mt-3">
            <button
              className={`btn btn-success me-2 ${hideButton}`}
              onClick={handleStartGame}
            >
              Start Game
            </button>
            <button
              className={`btn btn-danger me-2 ${hideButton}`}
              onClick={handleEndGame}
            >
              End Game
            </button>
            <button
              className={`btn btn-dark ${showButton}`}
              onClick={() => onDisableCourt(courtData.id)}
            >
              Disable Court
            </button>
          </div>
        )}
        {!courtData.enabled && (
          <button
            className="btn btn-success mt-3"
            onClick={() => onEnableCourt(courtData.id)}
          >
            Enable Court
          </button>
        )}
      </div>
    </div>
  )
}

export default Court
