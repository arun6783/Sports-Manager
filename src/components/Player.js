import React from 'react'
import { Card } from 'react-bootstrap'
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa'
import '../styles/Player.css'

function Player({ name, isSelected, isEnabled, onSelect, removePlayer }) {
  return (
    <Card
      className={`player-card mx-2 my-2 ${
        isSelected ? 'selected-player' : ''
      } ${!isEnabled ? 'disabled-player' : ''}`}
      style={{
        borderColor: isSelected ? '#28a745' : '#ced4da',
        backgroundColor: isSelected
          ? '#e7f1ff'
          : !isEnabled
          ? '#f0f0f0'
          : '#f9f9f9',
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
      {/* Add a tick icon when selected */}
      <Card.Body className="text-center">
        <Card.Title className="player-name">{name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Player
