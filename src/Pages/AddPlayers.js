import React, { useState } from 'react'
import PlayerForm from '../components/PlayerForm'

const AddPlayers = ({ onSavePlayers }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleSave = (players) => {
    onSavePlayers(players)
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <h1>Add Players</h1>
      {isModalOpen && (
        <PlayerForm onSave={handleSave} closeModal={handleCloseModal} />
      )}
    </div>
  )
}

export default AddPlayers
