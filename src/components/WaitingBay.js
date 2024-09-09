import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Player from './Player'
import '../styles/WaitingBay.css'
import { PlayerSelectionStrategyFactory } from '../strategies/PlayerSelectionStrategy'

function WaitingBay({
  players,
  tiers,
  onAssignCourt,
  removePlayer,
  onManagePlayers,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [pausedPlayers, setPausedPlayers] = useState([]) // Track paused players

  // Reset selected players when players change
  useEffect(() => {
    setSelectedPlayers([])
  }, [players])

  // Handle selecting/deselecting players
  const handleSelectPlayer = (selectedPlayer) => {
    if (pausedPlayers.includes(selectedPlayer)) return // Don't select paused players

    if (selectedPlayers.includes(selectedPlayer)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== selectedPlayer))
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, selectedPlayer])
    }
  }

  // Handle removing selection (used when pausing/unpausing)
  const handleRemoveSelection = (player) => {
    setSelectedPlayers((prevPlayers) => prevPlayers.filter((p) => p !== player))
  }

  // Handle pausing/unpausing players
  const handlePausePlayer = (player) => {
    if (pausedPlayers.includes(player)) {
      // Unpause player
      setPausedPlayers(pausedPlayers.filter((p) => p !== player))
    } else {
      // Pause player and unselect if selected
      if (selectedPlayers.includes(player)) {
        handleRemoveSelection(player)
      }
      setPausedPlayers([...pausedPlayers, player])
    }
  }

  // Determine if players are enabled for selection
  const enabledPlayers = () => {
    if (selectedPlayers.length === 0) return players.map((p) => true) // If no players are selected, all are enabled

    const firstPlayer = selectedPlayers[0]
    return players.map((player) => {
      if (pausedPlayers.includes(player)) return false // Disable paused players
      if (player === firstPlayer) return true // Always enable the first selected player
      if (selectedPlayers.includes(player)) return true // Enable already selected players
      return isPlayerSelectable(firstPlayer, player) // Apply selection rules for others
    })
  }

  // Logic to check if next player is selectable based on strategy pattern
  const isPlayerSelectable = (firstPlayer, nextPlayer) => {
    const strategy = PlayerSelectionStrategyFactory.getStrategy(
      firstPlayer.tier,
      tiers
    )
    return strategy.canSelectPlayer(firstPlayer, nextPlayer)
  }

  // Get the enabled/disabled status of each player
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
              isPaused={pausedPlayers.includes(player)}
              onSelect={() => handleSelectPlayer(player)}
              onPause={() => handlePausePlayer(player)}
              removeSelection={handleRemoveSelection}
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
