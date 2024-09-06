import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Player from './Player'
import '../styles/WaitingBay.css'
import { PlayerSelectionStrategyFactory } from '../strategies/PlayerSelectionStrategy' // Import the strategy factory

function WaitingBay({ players, onAssignCourt, removePlayer, onManagePlayers }) {
  const [selectedPlayers, setSelectedPlayers] = useState([])

  useEffect(() => {
    if (players.length > 0 && selectedPlayers.length === 0) {
      setSelectedPlayers([players[0]])
    }
  }, [players, selectedPlayers])

  useEffect(() => {
    setSelectedPlayers([])
  }, [players])

  const handleSelectPlayer = (selectedPlayer) => {
    if (selectedPlayers.includes(selectedPlayer)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== selectedPlayer))
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, selectedPlayer])
    }
  }

  const isPlayerSelectable = (firstPlayer, nextPlayer) => {
    const strategy = PlayerSelectionStrategyFactory.getStrategy(
      firstPlayer.tier
    )
    return strategy.canSelectPlayer(firstPlayer, nextPlayer)
  }

  const enabledPlayers = () => {
    const firstPlayer = selectedPlayers[0]
    if (!firstPlayer) return players.map((p) => false)

    return players.map((player) => {
      if (player === firstPlayer) return true
      if (selectedPlayers.includes(player)) return true
      return isPlayerSelectable(firstPlayer, player)
    })
  }

  const playerSelectionStatus = enabledPlayers()

  return (
    <div className="waiting-bay">
      <h4>Waiting Bay</h4>
      <div className="d-flex flex-wrap justify-content-start">
        {players.length === 0 ? (
          <p>No players in the waiting bay</p>
        ) : (
          players.map((player, index) => (
            <Player
              key={player.name}
              player={player}
              isSelected={selectedPlayers.includes(player)}
              isEnabled={playerSelectionStatus[index]}
              onSelect={() => handleSelectPlayer(player)}
              removePlayer={() => removePlayer(player.name)}
            />
          ))
        )}
      </div>

      <Button
        className="mt-3"
        variant="primary"
        disabled={selectedPlayers.length !== 4}
        onClick={() => onAssignCourt(selectedPlayers)}
      >
        Assign to Court
      </Button>

      <Button className="mt-3 ml-3" variant="primary" onClick={onManagePlayers}>
        Manage Players
      </Button>
    </div>
  )
}

export default WaitingBay
