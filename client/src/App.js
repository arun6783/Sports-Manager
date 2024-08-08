// src/App.js
import React from 'react'
import Register from './components/Register'
import GoogleLogin from './components/GoogleLogin'
import AddPlayer from './components/AddPlayer'
import SetAdmin from './components/SetAdmin'
import ConfigureClubNight from './components/ConfigureClubNight'
import ManageGames from './components/ManageGames'
import { Container, Row, Col } from 'react-bootstrap'

const App = () => {
  const clubId = 'someClubId' // You will replace this with actual logic to get the clubId

  return (
    <Container>
      <h1>Badminton Club Manager</h1>
      <Row>
        <Col>
          <Register />
          <GoogleLogin />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddPlayer clubId={clubId} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SetAdmin clubId={clubId} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigureClubNight clubId={clubId} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ManageGames clubId={clubId} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
