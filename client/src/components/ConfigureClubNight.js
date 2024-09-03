// src/components/ConfigureClubNight.js
import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'

const ConfigureClubNight = ({ clubId }) => {
  const [sessionType, setSessionType] = useState('normalPeg')
  const [courts, setCourts] = useState([])
  const [courtName, setCourtName] = useState('')
  const [message, setMessage] = useState('')

  const handleAddCourt = () => {
    setCourts([...courts, { name: courtName, enabled: true }])
    setCourtName('')
  }

  const handleConfigure = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/clubNights/configure', {
        clubId,
        sessionType,
        courts,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <Container>
      <h2>Configure Club Night</h2>
      <Form onSubmit={handleConfigure}>
        <Form.Group controlId="sessionType">
          <Form.Label>Session Type:</Form.Label>
          <Form.Control
            as="select"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
          >
            <option value="normalPeg">Normal Peg</option>
            <option value="threeTier">3-Tier Peg</option>
            <option value="fixedPair">Fixed Pair Round Robin</option>
          </Form.Control>
        </Form.Group>
        <h3>Courts</h3>
        <Form.Group controlId="courtName">
          <Form.Control
            type="text"
            placeholder="Court Name"
            value={courtName}
            onChange={(e) => setCourtName(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" type="button" onClick={handleAddCourt}>
          Add Court
        </Button>
        <ul>
          {courts.map((court, index) => (
            <li key={index}>{court.name}</li>
          ))}
        </ul>
        <Button variant="primary" type="submit">
          Save Configuration
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  )
}

export default ConfigureClubNight
