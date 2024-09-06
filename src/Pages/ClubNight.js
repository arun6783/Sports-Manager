import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import WaitingBay from '../components/WaitingBay'
import PlayerSelectionModal from '../components/PlayerSelectionModal'
import Court from '../components/Court'

const ClubNight = () => {
  const [clubName, setClubName] = useState('')
  const [players, setPlayers] = useState([]) // All available players
  const [selectedPlayers, setSelectedPlayers] = useState([]) // Players in the waiting bay
  const [courts, setCourts] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const clubNameParam = searchParams.get('code')
    if (clubNameParam) {
      fetchClubData(clubNameParam)
    }
  }, [searchParams])

  const fetchClubData = async (clubNameParam) => {
    try {
      const response = await fetch(`/api/getClub?clubName=${clubNameParam}`)
      if (response.ok) {
        const club = await response.json()
        setClubName(club.name)
        setPlayers(club.players)
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
      }
    } catch (error) {
      console.error('Failed to fetch club data:', error)
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
        (court) => court.players.length === 0
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

  const handleEndGame = (courtId) => {
    const updatedCourts = courts.map((court) => {
      if (court.court_id === courtId) {
        const playersFromCourt = court.players || []
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

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center mb-2">
        <Col xs="auto">
          <h1>Club Night: {clubName}</h1>
        </Col>
        <Col xs="auto" className="text-end">
          <Button variant="danger" onClick={() => navigate('/')}>
            End Club Night
          </Button>
        </Col>
      </Row>

      <WaitingBay
        players={selectedPlayers}
        onManagePlayers={handleManagePlayers}
        onAssignCourt={handleAssignToCourt}
        removePlayer={handleRemovePlayer}
      />

      {isModalOpen && (
        <PlayerSelectionModal
          players={players}
          selectedPlayers={selectedPlayers}
          courts={courts}
          onSelect={handleSelectPlayers}
          onClose={() => setModalOpen(false)}
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
    </Container>
  )
}

export default ClubNight
