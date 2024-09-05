import React, { useState } from 'react'
import PlayerList from './PlayerList'

const Step3Players = ({
  players,
  setPlayers,
  onNext,
  onPrev,
  tiers,
  rules,
}) => {
  const [newPlayer, setNewPlayer] = useState({ name: '', group: '', tier: '' })
  const [editIndex, setEditIndex] = useState(null)

  const handleSavePlayer = () => {
    if (newPlayer.name.trim() === '') return // Don't add empty players

    if (editIndex !== null) {
      const updatedPlayers = players.map((player, index) =>
        index === editIndex ? newPlayer : player
      )
      setPlayers(updatedPlayers)
      setEditIndex(null)
    } else {
      setPlayers([...players, newPlayer])
    }
    setNewPlayer({ name: '', group: '', tier: '' })
  }

  const handleEditPlayer = (index) => {
    setEditIndex(index)
    setNewPlayer(players[index])
  }

  const handleDeletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
      setNewPlayer({ name: '', group: '', tier: '' })
    }
  }

  const handleClear = () => {
    setNewPlayer({ name: '', group: '', tier: '' })
    setEditIndex(null)
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Step 3: Manage Players</h5>
      </div>
      <div className="card-body">
        <PlayerList
          players={players}
          onEdit={handleEditPlayer}
          onDelete={handleDeletePlayer}
          newPlayer={newPlayer}
          setNewPlayer={setNewPlayer}
          handleSavePlayer={handleSavePlayer}
          handleClear={handleClear}
          tiers={tiers}
          rules={rules}
          editIndex={editIndex}
        />
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={onPrev}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step3Players
