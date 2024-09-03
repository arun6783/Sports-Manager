// src/components/ManageGames.js
import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'

const ManageGames = ({ clubId }) => {
  const [courtId, setCourtId] = useState('')
  const [players, setPlayers] = useState([])
  const [gameId, setGameId] = useState('')
  const [message, setMessage] = useState('')

  const handleStartGame = async () => {
    try {
      const response = await axios.post('/api/games/start', {
        clubId,
        courtId,
        players,
      })
      setGameId(response.data.gameId)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  const handleEndGame = async () => {
    try {
      const response = await axios.post('/api/games/end', {
        clubId,
        gameId,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <Container>
      <h2>Manage Games</h2>
      <Form.Group controlId="courtId">
        <Form.Control
          type="text"
          placeholder="Court ID"
          value={courtId}
          onChange={(e) => setCourtId(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="players">
        <Form.Control
          type="text"
          placeholder="Player IDs (comma-separated)"
          value={players.join(',')}
          onChange={(e) => setPlayers(e.target.value.split(','))}
        />
      </Form.Group>
      <Button variant="success" onClick={handleStartGame}>
        Start Game
      </Button>
      <Button variant="danger" onClick={handleEndGame} disabled={!gameId}>
        End Game
      </Button>
      {message && <p>{message}</p>}
    </Container>
  )
}

export default ManageGames
