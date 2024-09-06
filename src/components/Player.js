import React from 'react'
import { Card } from 'react-bootstrap'
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa'
import '../styles/Player.css'

function Player({ player, isSelected, isEnabled, onSelect, removePlayer }) {
  const tierColors = {
    Div1: '#efafb0', // Red for Div1
    Div2: '#a6c991', // Blue for Div2
    Leisure: '#b9c0ef', // Green for Leisure
  }

  const { name, tier } = player
  console.log('player', player)
  return (
    <Card
      className={`player-card mx-2 my-2 ${
        isSelected ? 'selected-player' : ''
      } ${!isEnabled ? 'disabled-player' : ''}`}
      style={{
        borderColor: isSelected ? '#4e73df' : '#ced4da',
        backgroundColor: isSelected
          ? '#e7f1ff'
          : !isEnabled
          ? '#f0f0f0'
          : tierColors[tier],
      }}
      onClick={isEnabled ? onSelect : null}
    >
      <FaTimesCircle
        className="remove-icon"
        onClick={(e) => {
          e.stopPropagation()
          removePlayer()
        }}
      />
      {isSelected && <FaCheckCircle className="selected-icon" />}{' '}
      <Card.Body className="text-center">
        <Card.Title className="player-name">{name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Player
