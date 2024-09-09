import React from 'react'
import { Card } from 'react-bootstrap'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import '../styles/Player.css'
import { DEFAULT_TIER_COLORS } from '../shared/Constants'

function Player({
  player,
  isSelected,
  isEnabled,
  isPaused,
  onSelect,
  onPause,
  removeSelection,
  tierColors = DEFAULT_TIER_COLORS,
}) {
  const { name, tier } = player

  const handlePauseToggle = (e) => {
    e.stopPropagation()
    if (!isPaused && isSelected) {
      removeSelection(player)
    }
    onPause(player)
  }

  return (
    <Card
      onClick={isEnabled ? onSelect : null}
      className={`player-card mx-2 my-2 ${isSelected ? 'selected-player' : ''}`}
      style={{
        borderColor: isSelected ? '#4e73df' : '#ced4da',
        backgroundColor: tierColors[tier] || '#ced4da',
        opacity: isPaused ? 0.6 : 1,
        width: '120px',
        height: '120px',
      }}
    >
      <div
        className="pause-icon-container"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {isPaused ? (
          <FaPlayCircle className="pause-icon" onClick={handlePauseToggle} />
        ) : (
          <FaPauseCircle className="pause-icon" onClick={handlePauseToggle} />
        )}
      </div>

      <Card.Body
        className="text-center"
        style={{
          cursor: isEnabled ? 'pointer' : 'not-allowed',
        }}
      >
        <Card.Title
          className="player-name"
          style={{
            border: isSelected ? '2px solid #4e73df' : 'none',
            borderRadius: '10px',
            padding: '5px',
            display: 'inline-block',
          }}
        >
          {name}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Player
