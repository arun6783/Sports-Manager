import React, { useState } from 'react'

function PlayerForm({ onSave, closeModal }) {
  const [playerName, setPlayerName] = useState('')
  const [playerGroup, setPlayerGroup] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave([{ name: playerName, group: playerGroup }])
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div className="mb-3">
        <label htmlFor="playerName" className="form-label">
          Player Name
        </label>
        <input
          type="text"
          id="playerName"
          className="form-control"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="playerGroup" className="form-label">
          Group
        </label>
        <input
          type="text"
          id="playerGroup"
          className="form-control"
          placeholder="Enter player group"
          value={playerGroup}
          onChange={(e) => setPlayerGroup(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default PlayerForm
