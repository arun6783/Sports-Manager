import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import {
  FaFlag,
  FaPlay,
  FaStop,
  FaBan,
  FaToggleOff,
  FaToggleOn,
} from 'react-icons/fa'
import '../styles/Court.css'

const Court = ({ courtData, onEndGame, onStartGame, onDisableCourt }) => {
  const { players = [], isDisabled = false, court_id } = courtData
  const [gameInProgress, setGameInProgress] = useState(false)

  const handleStartGame = () => {
    onStartGame(court_id)
    setGameInProgress(true)
  }

  const handleEndGame = () => {
    onEndGame(court_id)
    setGameInProgress(false)
  }

  return (
    <Card
      className={`court ${
        isDisabled ? 'disabled-court' : ''
      } border-secondary m-3 shadow-sm`}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>{`Court ${court_id}`}</span>
        <div className="d-flex">
          {!isDisabled && players.length > 0 && (
            <>
              <Button
                variant="success"
                className="btn-sm mx-1"
                onClick={handleStartGame}
                disabled={gameInProgress}
              >
                <FaPlay />
              </Button>
              <Button
                variant="danger"
                className="btn-sm mx-1"
                onClick={handleEndGame}
              >
                <FaStop />
              </Button>
            </>
          )}

          {!isDisabled && players.length === 0 && (
            <FaToggleOff
              className="toggle-icon"
              onClick={() => onDisableCourt(court_id)}
            />
          )}
          {isDisabled && (
            <FaToggleOn
              className="toggle-icon"
              onClick={() => onDisableCourt(court_id)}
            />
          )}
        </div>
      </div>
      {gameInProgress && (
        <div className="text-end pe-2">
          <small className="text-muted">Game in progress</small>
        </div>
      )}

      {/* Conditional rendering for court body */}
      <div className={`card-body ${isDisabled ? 'disabled-card-body' : ''}`}>
        {isDisabled ? (
          <div className="card-body-disabled-overlay">
            <h3 className="card-title mt-4">Court Disabled</h3>
          </div>
        ) : players.length === 0 ? (
          <h5 className="card-title">No players assigned yet</h5>
        ) : (
          players.map((player) => (
            <p key={player.name} className="card-text fw-bold">
              {player.name}
            </p>
          ))
        )}
      </div>
    </Card>
  )
}

export default Court
