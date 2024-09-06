import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Player from './Player'
import '../styles/WaitingBay.css'

function WaitingBay({ players, onAssignCourt, removePlayer, onManagePlayers }) {
  const [selectedPlayers, setSelectedPlayers] = useState([])

  useEffect(() => {
    // Ensure that when modal is closed and players are selected, the waiting bay is updated
    if (selectedPlayers.length === 0) {
      setSelectedPlayers(players) // Populate waiting bay with initial players from selection modal
    }
  }, [players])

  const handleSelectPlayer = (selectedPlayer) => {
    if (selectedPlayers.includes(selectedPlayer)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== selectedPlayer)) // Unselect player
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, selectedPlayer]) // Select up to 4 players
    }
  }

  const isPlayerSelectable = (firstPlayer, nextPlayer) => {
    if (firstPlayer.tier === 'Div1') {
      return nextPlayer.tier === 'Div1' || nextPlayer.tier === 'Div2'
    } else if (firstPlayer.tier === 'Div2') {
      return (
        nextPlayer.tier === 'Div1' ||
        nextPlayer.tier === 'Div2' ||
        nextPlayer.tier === 'Leisure'
      )
    } else if (firstPlayer.tier === 'Leisure') {
      return nextPlayer.tier === 'Leisure' || nextPlayer.tier === 'Div2'
    }
    return false
  }

  return (
    <div className="waiting-bay">
      <h4>Waiting Bay</h4>
      <div className="d-flex flex-wrap justify-content-start">
        {players.length === 0 ? (
          <p>No players in the waiting bay</p>
        ) : (
          players.map((player) => (
            <Player
              key={player.name}
              name={`${player.name} (${player.tier})`}
              isSelected={selectedPlayers.includes(player)}
              isEnabled={true} // Always enabled since we removed `enabledPlayers`
              onSelect={() => handleSelectPlayer(player)}
              removePlayer={() => removePlayer(player.name)}
            />
          ))
        )}
      </div>

      {/* Always show Manage Players button */}
      <Button className="mt-3" variant="primary" onClick={onManagePlayers}>
        Manage Players
      </Button>

      <Button
        className="mt-3 ml-3"
        variant="primary"
        disabled={selectedPlayers.length !== 4} // Enable only when 4 players are selected
        onClick={() => onAssignCourt(selectedPlayers)}
      >
        Assign to Court
      </Button>
    </div>
  )
}

export default WaitingBay
