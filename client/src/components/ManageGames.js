// src/components/ManageGames.js
import React, { useState } from 'react'
import axios from 'axios'

const ManageGames = ({ clubId }) => {
  const [courtId, setCourtId] = useState('')
  const [players, setPlayers] = useState([])
  const [gameId, setGameId] = useState('')
  const [message, setMessage] = useState('')

  const handleStartGame = async () => {
    try {
      const response = await axios.post('/api/games/start', {
        clubId,
        courtId,
        players,
      })
      setGameId(response.data.gameId)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  const handleEndGame = async () => {
    try {
      const response = await axios.post('/api/games/end', {
        clubId,
        gameId,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <div>
      <h2>Manage Games</h2>
      <input
        type="text"
        placeholder="Court ID"
        value={courtId}
        onChange={(e) => setCourtId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player IDs (comma-separated)"
        value={players.join(',')}
        onChange={(e) => setPlayers(e.target.value.split(','))}
      />
      <button onClick={handleStartGame}>Start Game</button>
      <button onClick={handleEndGame} disabled={!gameId}>
        End Game
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ManageGames
