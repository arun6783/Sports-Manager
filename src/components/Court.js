import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { FaFlag, FaPlay, FaStop, FaBan, FaPowerOff } from 'react-icons/fa' // Added FaPowerOff for Enable/Disable
import '../styles/Court.css'

const Court = ({ courtData, onEndGame, onStartGame, onDisableCourt }) => {
  const { players = [], isDisabled = false, court_id } = courtData

  return (
    <Card
      className={`court ${
        isDisabled ? 'disabled-court' : ''
      } border-secondary m-3`}
      style={{ maxWidth: '18rem' }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>{`Court ${court_id}`}</span>
        <div className="d-flex">
          {!isDisabled && players.length > 0 && (
            <>
              <Button
                variant="success"
                className="btn-sm mx-1"
                onClick={() => onStartGame(court_id)}
              >
                <FaPlay />
              </Button>
              <Button
                variant="danger"
                className="btn-sm mx-1"
                onClick={() => onEndGame(court_id)}
              >
                <FaStop />
              </Button>
            </>
          )}

          {!isDisabled && players.length === 0 && (
            <Button
              variant="secondary"
              className="btn-sm mx-1"
              onClick={() => onDisableCourt(court_id)}
            >
              <FaPowerOff />
            </Button>
          )}
          {isDisabled && (
            <Button
              variant="success"
              className="btn-sm mx-1"
              onClick={() => onDisableCourt(court_id)}
            >
              <FaPowerOff />
            </Button>
          )}
        </div>
        
      </div>
      {!isDisabled ? (
        <div className="card-body text-secondary">
          {players.length === 0 ? (
            <h5 className="card-title">No players assigned yet</h5>
          ) : (
            players.map((player) => (
              <p key={player.name} className="card-text">
                {player.name}
              </p>
            ))
          )}
        </div>
      ) : (
        <div className="card-body text-secondary text-center">
          <FaBan size={50} className="text-muted" />{' '}
          <h5 className="card-title mt-2">Court Disabled</h5>
        </div>
      )}
    </Card>
  )
}

export default Court
