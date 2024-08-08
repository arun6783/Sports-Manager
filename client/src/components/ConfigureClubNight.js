// src/components/ConfigureClubNight.js
import React, { useState } from 'react'
import axios from 'axios'

const ConfigureClubNight = ({ clubId }) => {
  const [sessionType, setSessionType] = useState('normalPeg')
  const [courts, setCourts] = useState([])
  const [courtName, setCourtName] = useState('')
  const [message, setMessage] = useState('')

  const handleAddCourt = () => {
    setCourts([...courts, { name: courtName, enabled: true }])
    setCourtName('')
  }

  const handleConfigure = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/clubNights/configure', {
        clubId,
        sessionType,
        courts,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <div>
      <h2>Configure Club Night</h2>
      <form onSubmit={handleConfigure}>
        <label>Session Type:</label>
        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
        >
          <option value="normalPeg">Normal Peg</option>
          <option value="threeTier">3-Tier Peg</option>
          <option value="fixedPair">Fixed Pair Round Robin</option>
        </select>

        <h3>Courts</h3>
        <input
          type="text"
          placeholder="Court Name"
          value={courtName}
          onChange={(e) => setCourtName(e.target.value)}
        />
        <button type="button" onClick={handleAddCourt}>
          Add Court
        </button>

        <ul>
          {courts.map((court, index) => (
            <li key={index}>{court.name}</li>
          ))}
        </ul>

        <button type="submit">Save Configuration</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ConfigureClubNight
