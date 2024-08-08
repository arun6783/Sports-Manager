// src/components/AddPlayer.js
import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'

const AddPlayer = ({ clubId }) => {
  const [playerName, setPlayerName] = useState('')
  const [playerEmail, setPlayerEmail] = useState('')
  const [isGuest, setIsGuest] = useState(false)
  const [message, setMessage] = useState('')

  const handleAddPlayer = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/players/add', {
        clubId,
        playerName,
        playerEmail,
        isGuest,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <Container>
      <h2>Add Player</h2>
      <Form onSubmit={handleAddPlayer}>
        <Form.Group controlId="playerName">
          <Form.Label>Player Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="playerEmail">
          <Form.Label>Player Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Player Email"
            value={playerEmail}
            onChange={(e) => setPlayerEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="isGuest">
          <Form.Check
            type="checkbox"
            label="Guest Player"
            checked={isGuest}
            onChange={(e) => setIsGuest(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Player
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  )
}

export default AddPlayer
