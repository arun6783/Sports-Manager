import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { FaFlag, FaPlay, FaStop } from 'react-icons/fa'
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
    <Card className={`court ${isDisabled ? 'disabled-court' : ''}`}>
      <h3>{`Court ${id}`}</h3>
      <div>
        {players.length === 0 ? (
          <p>No players assigned yet</p>
        ) : (
          players.map((player) => <p key={player.name}>{player.name}</p>)
        )}
      </div>

      <div className="d-flex justify-content-center">
        {!isDisabled && players.length > 0 ? (
          <>
            <Button
              variant="success"
              className="m-2"
              onClick={() => onStartGame(id)}
            >
              <FaPlay /> Start Game
            </Button>
            <Button
              variant="danger"
              className="m-2"
              onClick={() => onEndGame(id)}
            >
              <FaStop /> End Game
            </Button>
          </>
        ) : null}

        <Button
          variant="secondary"
          className="m-2"
          onClick={() => onDisableCourt(id)}
        >
          {isDisabled ? <FaFlag /> : <FaFlag />}{' '}
          {/* Use flag to show disabled/enabled status */}
          {isDisabled ? ' Enable Court' : ' Disable Court'}
        </Button>
      </div>
    </Card>
  )
}

export default Court
