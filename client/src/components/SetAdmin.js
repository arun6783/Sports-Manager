// src/components/SetAdmin.js
import React, { useState } from 'react'
import axios from 'axios'

const SetAdmin = ({ clubId }) => {
  const [playerId, setPlayerId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState('')

  const handleSetAdmin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/players/setAdmin', {
        clubId,
        playerId,
        isAdmin,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <div>
      <h2>Set Player as Admin</h2>
      <form onSubmit={handleSetAdmin}>
        <input
          type="text"
          placeholder="Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
        <button type="submit">Set Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SetAdmin
