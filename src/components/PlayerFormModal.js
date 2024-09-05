import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'

const PlayerFormModal = ({ isOpen, onClose, onSave, playerToEdit, tiers }) => {
  const [playerName, setPlayerName] = useState('')
  const [selectedTier, setSelectedTier] = useState('')

  useEffect(() => {
    if (playerToEdit) {
      setPlayerName(playerToEdit.name)
      setSelectedTier(playerToEdit.tier || '')
    }
  }, [playerToEdit])

  const handleSave = () => {
    const player = { name: playerName, tier: selectedTier }
    onSave(player)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add/Edit Player">
      <div className="form-group">
        <label>Player Name:</label>
        <input
          type="text"
          className="form-control"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      {tiers.length > 0 && (
        <div className="form-group mt-3">
          <label>Tier:</label>
          <select
            className="form-select"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="">Select Tier</option>
            {tiers.map((tier, index) => (
              <option key={index} value={tier.name}>
                {tier.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="modal-footer mt-4">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default PlayerFormModal
