import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const PlayerSelectionModal = ({
  players,
  selectedPlayers,
  onSelect,
  onClose,
  courts,
  tiers = [],
  setPlayers, // Update main player list with adhoc players
}) => {
  const [selected, setSelected] = useState([])
  const [newAdhocPlayers, setNewAdhocPlayers] = useState([]) // Store multiple adhoc players
  const [newAdhocPlayerName, setNewAdhocPlayerName] = useState('')
  const [selectedTier, setSelectedTier] = useState('')

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

  const handleAddAdhocPlayer = () => {
    if (newAdhocPlayerName) {
      const adhocPlayer = {
        name: newAdhocPlayerName,
        tier: selectedTier || 'N/A',
        isAdhoc: true, // Mark this player as adhoc
      }
      setNewAdhocPlayers((prev) => [...prev, adhocPlayer])
      setNewAdhocPlayerName('')
      setSelectedTier('')
    }
  }

  const handleSave = () => {
    // Add adhoc players to main player list
    const updatedPlayers = [...players, ...newAdhocPlayers]
    setPlayers(updatedPlayers) // Merge adhoc players into the club players list

    const selectedPlayersDetails = updatedPlayers.filter((p) =>
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
        <span className="ml-auto">Total selected: {selected.length}</span>
      </Modal.Header>
      <Modal.Body>
        <h5>Club Players</h5>
        <Form>
          {players.map((player) => {
            const isInCourt = playersInCourts.includes(player.name)
            return (
              <Form.Check
                key={player.name}
                type="checkbox"
                label={`${player.name} (${player.tier})`}
                checked={selected.includes(player.name) || isInCourt}
                disabled={isInCourt}
                onChange={() => handleSelect(player.name)}
              />
            )
          })}
        </Form>

        <hr />
        <h5>Adhoc Players for the Day</h5>
        <Form>
          {newAdhocPlayers.map((player, index) => (
            <Form.Check
              key={player.name}
              type="checkbox"
              label={`${player.name} (${player.tier})`}
              checked={selected.includes(player.name)}
              onChange={() => handleSelect(player.name)}
            />
          ))}

          <Form.Group className="mt-3">
            <Form.Label>Player Name</Form.Label>
            <Form.Control
              type="text"
              value={newAdhocPlayerName}
              onChange={(e) => setNewAdhocPlayerName(e.target.value)}
              placeholder="Enter player name"
            />
          </Form.Group>
          {tiers.length > 0 && (
            <Form.Group className="mt-2">
              <Form.Label>Select Tier</Form.Label>
              <Form.Control
                as="select"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
              >
                <option value="">Select Tier</option>
                {tiers.map((tier, index) => (
                  <option key={index} value={tier.name}>
                    {tier.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          <Button className="mt-2" onClick={handleAddAdhocPlayer}>
            Add Adhoc Player
          </Button>
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
