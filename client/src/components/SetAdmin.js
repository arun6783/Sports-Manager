// src/components/SetAdmin.js
import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'

const SetAdmin = ({ clubId }) => {
  const [playerId, setPlayerId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState('')

  const handleSetAdmin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/players/setAdmin', {
        clubId,
        playerId,
        isAdmin,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <Container>
      <h2>Set Player as Admin</h2>
      <Form onSubmit={handleSetAdmin}>
        <Form.Group controlId="playerId">
          <Form.Label>Player ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Player ID"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="isAdmin">
          <Form.Check
            type="checkbox"
            label="Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Set Admin
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  )
}

export default SetAdmin
