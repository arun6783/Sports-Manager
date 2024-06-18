import React, { useState, useEffect } from 'react'

function Court({
  courtData,
  onEndGame,
  onEnableCourt,
  onDisableCourt,
  isCourtSelected,
  setIsCourtSelected,
}) {
  const hideButton = courtData.players.length === 0 ? 'invisible' : 'visible'
  const showButton = courtData.players.length === 0 ? 'visible' : 'invisible'

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
      className={`shadow-md rounded-lg p-2 m-2 flex-none 
    ${isCourtSelected ? 'border-4 rounded-lg shadow border-red-300' : ''} 
    ${
      courtData.enabled
        ? 'bg-blue-200 cursor-pointer hover:bg-blue-100'
        : 'bg-gray-500 opacity-50 cursor-not-allowed'
    }
    sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4
  `}
      onClick={() => {
        setIsCourtSelected(courtData)
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between">
        <h2 className="text-xl font-bold">{courtData.courtName}</h2>
        {showTimeElapsed && (
          <span className="text-l font-bold sm:ml-2 my-2 sm:my-0">
            Time elapsed: {elapsedTime} seconds
          </span>
        )}
      </div>

      <div className="flex justify-between">
        <div>
          {courtData.players.map((player) => (
            <p className="text-xl font-bold" key={player.name}>
              {player.name}
            </p>
          ))}
        </div>
        {courtData.enabled && isCourtSelected && (
          <div className="court-actions flex flex-col m-2 sm:ml-4">
            <button
              className={`my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
              ${hideButton}
              `}
              onClick={handleStartGame}
            >
              Start Game
            </button>
            <button
              className={`my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
              ${hideButton}
              `}
              onClick={handleEndGame}
            >
              End Game
            </button>
            <button
              className={`my-1 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${showButton}`}
              onClick={() => onDisableCourt(courtData.id)}
            >
              Disable Court
            </button>
          </div>
        )}
      </div>
      {!courtData.enabled && (
        <button
          className="my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onEnableCourt(courtData.id)}
        >
          Enable Court
        </button>
      )}
    </div>
  )
}

export default Court
