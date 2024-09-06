import React from 'react'
import { Button } from 'react-bootstrap'
import '../styles/Court.css'

const Court = ({
  courtData,
  courtNumber,
  onEndGame,
  onStartGame,
  onDisableCourt,
}) => {
  const { id = courtNumber, players = [], isDisabled = false } = courtData || {}

  return (
    <div className={`court ${isDisabled ? 'disabled-court' : ''}`}>
      <h3>{`Court ${id}`}</h3>
      <div>
        {players.length === 0 ? (
          <p>No players assigned yet</p>
        ) : (
          players.map((player) => <p key={player.name}>{player.name}</p>)
        )}
      </div>

      {!isDisabled ? (
        <>
          <Button
            variant="success"
            className="m-2"
            onClick={() => onStartGame(id)}
          >
            Start Game
          </Button>
          <Button
            variant="danger"
            className="m-2"
            onClick={() => onEndGame(id)}
          >
            End Game
          </Button>
          <Button
            variant="secondary"
            className="m-2"
            onClick={() => onDisableCourt(id)}
          >
            Disable Court
          </Button>
        </>
      ) : (
        <Button
          variant="success"
          className="m-2"
          onClick={() => onDisableCourt(id)}
        >
          Enable Court
        </Button>
      )}
    </div>
  )
}

export default Court
