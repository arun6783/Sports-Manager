import React, { useState } from 'react'
import PlayerList from './PlayerList'
import PlayerFormModal from './PlayerFormModal'

const Step3Players = ({ players, setPlayers, tiers, onNext, onPrev }) => {
  const [isPlayerModalOpen, setPlayerModalOpen] = useState(false)
  const [playerToEdit, setPlayerToEdit] = useState(null)

  const handleAddPlayer = (player) => {
    if (playerToEdit !== null) {
      const updatedPlayers = players.map((p, index) =>
        index === playerToEdit ? player : p
      )
      setPlayers(updatedPlayers)
      setPlayerToEdit(null)
    } else {
      setPlayers([...players, player])
    }
  }

  const handleEditPlayer = (index) => {
    setPlayerToEdit(index)
    setPlayerModalOpen(true)
  }

  const handleDeletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 3: Manage Players</h5>
      </div>
      <div className="card-body">
        <PlayerList
          players={players}
          onEdit={handleEditPlayer}
          onDelete={handleDeletePlayer}
        />
        <button
          className="btn btn-secondary mt-3"
          onClick={() => setPlayerModalOpen(true)}
        >
          Add Player
        </button>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={onPrev}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={onNext}>
            Next
          </button>
        </div>
      </div>

      <PlayerFormModal
        isOpen={isPlayerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
        onSave={handleAddPlayer}
        playerToEdit={playerToEdit !== null ? players[playerToEdit] : null}
        tiers={tiers}
      />
    </div>
  )
}

export default Step3Players
