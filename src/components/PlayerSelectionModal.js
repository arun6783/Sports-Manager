import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const PlayerSelectionModal = ({
  players,
  selectedPlayers,
  onSelect,
  onClose,
  courts,
}) => {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSelected(selectedPlayers.map((p) => p.name)) // Pre-select already selected players
  }, [selectedPlayers])

  const handleSelect = (playerName) => {
    const playersInCourts = courts.flatMap(
      (court) => court.players?.map((p) => p.name) || []
    )
    const isInCourt = playersInCourts.includes(playerName)

    if (!isInCourt) {
      setSelected((prev) =>
        prev.includes(playerName)
          ? prev.filter((name) => name !== playerName)
          : [...prev, playerName]
      )
    }
  }

  const handleSave = () => {
    const selectedPlayersDetails = players.filter((p) =>
      selected.includes(p.name)
    )
    onSelect(selectedPlayersDetails)
    onClose()
  }

  const playersInCourts = courts.flatMap(
    (court) => court.players?.map((p) => p.name) || []
  )

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Players</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {players.map((player) => {
            const isInCourt = playersInCourts.includes(player.name)
            return (
              <Form.Check
                key={player.name}
                type="checkbox"
                label={`${player.name} (${player.tier})`} // Show player name and tier
                checked={selected.includes(player.name) || isInCourt}
                disabled={isInCourt} // Disable players that are in courts
                onChange={() => handleSelect(player.name)}
              />
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PlayerSelectionModal
