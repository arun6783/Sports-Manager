import React, { useState, useEffect } from 'react'
import Player from './Player'
import { PLAYER_GROUP } from '../shared/Constants'

function WaitingBay({ players, onAssignCourt, removePlayer }) {
  const [selectedPlayers, setSelectedPlayers] = useState([])

  useEffect(() => {
    setSelectedPlayers(players.filter((player) => player.isNext))
  }, [players])

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.name !== player.name))
    } else if (selectedPlayers.length === 0 || selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  const isPlayerSelectable = (player, index) => {
    if (index === 0 && selectedPlayers.length === 0) return true

    if (selectedPlayers.length === 0 || index > 7) return false

    switch (selectedPlayers[0].group) {
      case PLAYER_GROUP.DIV1:
        return (
          player.group === PLAYER_GROUP.DIV1 ||
          player.group === PLAYER_GROUP.DIV2
        )
      case PLAYER_GROUP.DIV2:
        return (
          player.group === PLAYER_GROUP.DIV1 ||
          player.group === PLAYER_GROUP.DIV2 ||
          player.group === PLAYER_GROUP.LEISURE
        )
      case PLAYER_GROUP.LEISURE:
        return (
          player.group === PLAYER_GROUP.LEISURE ||
          player.group === PLAYER_GROUP.DIV2
        )
      default:
        return false
    }
  }

  const isAssignButtonVisible = selectedPlayers.length === 4

  return (
    <div className="card bg-light mb-4">
      <div className="card-body">
        <h5 className="card-title">Waiting Bay</h5>
        <div className="d-flex flex-wrap">
          {players.map((player, index) => (
            <Player
              key={player.name}
              name={player.name}
              group={player.group}
              isNext={index === 0}
              isSelected={selectedPlayers.some((p) => p.name === player.name)}
              isEnabled={isPlayerSelectable(player, index)}
              onSelect={() => handlePlayerSelect(player)}
              removePlayer={() => removePlayer(player.name)}
            />
          ))}
        </div>
        {isAssignButtonVisible && (
          <button
            className="btn btn-primary mt-3"
            onClick={() => onAssignCourt(selectedPlayers)}
          >
            Assign to Court
          </button>
        )}
      </div>
    </div>
  )
}

export default WaitingBay
