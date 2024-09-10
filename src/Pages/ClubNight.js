import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import WaitingBay from '../components/WaitingBay'
import PlayerSelectionModal from '../components/PlayerSelectionModal'
import Court from '../components/Court'
import { DEFAULT_TIER_COLORS } from '../shared/Constants'

const ClubNight = () => {
  const [clubName, setClubName] = useState('')
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [courts, setCourts] = useState([])
  const [tiers, setTiers] = useState([])
  const [tierColors, setTierColors] = useState(DEFAULT_TIER_COLORS)
  const [loading, setLoading] = useState(false)
  const [clubNightId, setClubNightId] = useState(null) // Store the clubNightId
  const [clubId, setClubId] = useState(null)

  const [isModalOpen, setModalOpen] = useState(false)
  const [isEndClubNightOpen, setEndClubNightOpen] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const [shuttleBoxes, setShuttleBoxes] = useState(0)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const clubNameParam = searchParams.get('club')

    console.log('useEffect searchParams:', clubNameParam)

    if (clubNameParam && !loading) {
      fetchClubData(clubNameParam)
    }
  }, [searchParams])

  const startClubNight = async (clubNameParam) => {
    try {
      const response = await fetch('/api/startClubNight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clubName: clubNameParam }),
      })

      if (response.ok) {
        const clubNight = await response.json()
        setClubNightId(clubNight._id)
      } else {
        console.error('Failed to start club night')
      }
    } catch (error) {
      console.error('Error starting club night:', error)
    }
  }

  const fetchClubData = async (clubNameParam) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/getClub?clubName=${clubNameParam}`)
      if (response.ok) {
        const club = await response.json()
        setClubName(club.clubName)
        setPlayers(club.players)
        setTiers(club.tiers)
        setClubId(club._id)
        // Create a color map based on the tier names
        const colorMap = {}
        club.tiers.forEach((tier) => {
          colorMap[tier.name] = tier.color || DEFAULT_TIER_COLORS[tier.name]
        })
        setTierColors(colorMap)

        // Initialize courts with court data and default enabled status
        const courtArray = Array.from(
          { length: parseInt(club.numCourts) },
          (_, i) => ({
            court_id: i + 1,
            isDisabled: false,
            players: [],
          })
        )
        setCourts(courtArray)

        // Start the club night
        await startClubNight(clubNameParam) // Start the club night and set the clubNightId
      }
    } catch (error) {
      console.error('Failed to fetch club data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManagePlayers = () => {
    setModalOpen(true)
  }

  const handleSelectPlayers = (selectedPlayersDetails) => {
    const playersInWaitingBay = selectedPlayers.map((p) => p.name)
    const playersInCourts = courts.flatMap(
      (court) => court.players?.map((p) => p.name) || []
    )

    const newPlayers = []

    for (let i = 0; i < selectedPlayersDetails.length; i++) {
      const player = selectedPlayersDetails[i]

      if (
        !playersInWaitingBay.includes(player.name) &&
        !playersInCourts.includes(player.name)
      ) {
        newPlayers.push(player)
      }
    }

    const remainingPlayers = selectedPlayers.filter((player) =>
      selectedPlayersDetails.some((selected) => selected.name === player.name)
    )

    const updatedWaitingBayPlayers = [...remainingPlayers, ...newPlayers]

    setSelectedPlayers(updatedWaitingBayPlayers)
    setModalOpen(false)
  }

  const handleRemovePlayer = (playerName) => {
    setSelectedPlayers((prevPlayers) =>
      prevPlayers.filter((p) => p.name !== playerName)
    )
  }

  const handleAssignToCourt = (waitingBaySelectedPlayers) => {
    if (waitingBaySelectedPlayers.length === 4) {
      const freeCourtIndex = courts.findIndex(
        (court) => court.players.length === 0 && !court.isDisabled
      )

      if (freeCourtIndex !== -1) {
        const updatedCourts = [...courts]
        updatedCourts[freeCourtIndex].players = [...waitingBaySelectedPlayers]
        updatedCourts[freeCourtIndex].isDisabled = false
        setCourts(updatedCourts)

        const remainingPlayers = selectedPlayers.filter(
          (player) =>
            !waitingBaySelectedPlayers.some(
              (selected) => selected.name === player.name
            )
        )
        setSelectedPlayers(remainingPlayers)
      }
    }
  }

  const handleEndGame = async (courtId) => {
    const courtToEnd = courts.find((court) => court.court_id === courtId)
    if (!courtToEnd) return

    const playersFromCourt = courtToEnd.players || []

    // Save the court and players info to the API
    try {
      await fetch('/api/endGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courtId,
          clubNightId,
          players: playersFromCourt,
          date: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error('Error ending the game:', error)
    }

    // Reset the court after ending the game
    const updatedCourts = courts.map((court) => {
      if (court.court_id === courtId) {
        setSelectedPlayers((prevPlayers) => [
          ...prevPlayers,
          ...playersFromCourt,
        ])
        return { ...court, players: [], isDisabled: false }
      }
      return court
    })
    setCourts(updatedCourts)
  }

  const handleDisableCourt = (courtId) => {
    const updatedCourts = courts.map((court) =>
      court.court_id === courtId
        ? { ...court, isDisabled: !court.isDisabled }
        : court
    )
    setCourts(updatedCourts)
  }

  const handleEndClubNight = async () => {
    if (confirmationText === 'Adidda' && shuttleBoxes > 0) {
      const playersPlayedTonight = courts.flatMap((court) => court.players)

      const clubNightData = {
        clubNightId,
        players: playersPlayedTonight,
        shuttlesUsed: shuttleBoxes,
        date: new Date().toISOString(),
      }

      // Save club night data to the API
      try {
        const response = await fetch('/api/endClubNight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clubNightData),
        })

        if (response.ok) {
          alert('Club night ended successfully!')
          setEndClubNightOpen(false)
          setConfirmationText('')
          setShuttleBoxes(0)
          navigate('/')
        } else {
          console.error('Failed to end club night')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      alert('Please enter correct confirmation and shuttle boxes used')
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center mb-2">
        <Col xs="auto">
          <h1>Club Night: {clubName}</h1>
        </Col>
        <Col xs="auto" className="text-end">
          <Button variant="danger" onClick={() => setEndClubNightOpen(true)}>
            End Club Night
          </Button>
        </Col>
      </Row>

      <WaitingBay
        players={selectedPlayers}
        tiers={tiers} // Pass tiers as a prop
        onAssignCourt={handleAssignToCourt}
        removePlayer={handleRemovePlayer}
        onManagePlayers={handleManagePlayers}
      />

      {isModalOpen && (
        <PlayerSelectionModal
          players={players}
          selectedPlayers={selectedPlayers}
          courts={courts}
          onSelect={handleSelectPlayers}
          onClose={() => setModalOpen(false)}
          setPlayers={setPlayers}
          tiers={tiers}
          tierColors={tierColors} // Pass dynamic tier colors to the modal
        />
      )}

      <h3>Available Courts</h3>
      <Row>
        {courts.length > 0 ? (
          courts.map((court, index) => (
            <Court
              key={index}
              courtData={court}
              onEndGame={handleEndGame}
              onStartGame={() => console.log('Start Game')}
              onDisableCourt={handleDisableCourt}
            />
          ))
        ) : (
          <p>No courts available</p>
        )}
      </Row>

      {/* End Club Night Popup */}
      {isEndClubNightOpen && (
        <Modal
          show={isEndClubNightOpen}
          onHide={() => setEndClubNightOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>End Club Night</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="confirmationText">
                <Form.Label>Enter "Adidda" to confirm:</Form.Label>
                <Form.Control
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="shuttleBoxes">
                <Form.Label>Shuttle boxes used:</Form.Label>
                <Form.Control
                  type="number"
                  value={shuttleBoxes}
                  onChange={(e) => setShuttleBoxes(Number(e.target.value))}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setEndClubNightOpen(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleEndClubNight}>
              End Club Night
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  )
}

export default ClubNight
