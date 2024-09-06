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
        setCourts(Array.from({ length: parseInt(club.numCourts) }, () => ({})))
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

    const newPlayers = selectedPlayersDetails.filter(
      (player) =>
        !playersInWaitingBay.includes(player.name) &&
        !playersInCourts.includes(player.name)
    )

    setSelectedPlayers([...newPlayers])
    setModalOpen(false)
  }

  const handleRemovePlayer = (playerName) => {
    setSelectedPlayers((prevPlayers) =>
      prevPlayers.filter((p) => p.name !== playerName)
    )
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

  const handleAssignToCourt = () => {
    if (selectedPlayers.length === 4) {
      const freeCourtIndex = courts.findIndex(
        (court) => !court.players || court.players.length === 0
      )

      if (freeCourtIndex !== -1) {
        const updatedCourts = [...courts]
        updatedCourts[freeCourtIndex].players = [...selectedPlayers]
        setCourts(updatedCourts)
        setSelectedPlayers([]) // Clear waiting bay after assigning to court
      }
    }
  }

  const handleEndGame = (courtId) => {
    const updatedCourts = [...courts]
    const courtIndex = updatedCourts.findIndex((court) => court.id === courtId)

    if (courtIndex !== -1) {
      const playersFromCourt = updatedCourts[courtIndex].players || []

      // Clear the court
      updatedCourts[courtIndex].players = []

      // Move players from the court back to the waiting bay
      setSelectedPlayers((prevPlayers) => [...prevPlayers, ...playersFromCourt])

      // Update courts state
      setCourts(updatedCourts)
    }
  }

  const handleDisableCourt = (courtId) => {
    const updatedCourts = courts.map((court) =>
      court.id === courtId ? { ...court, isDisabled: !court.isDisabled } : court
    )
    setCourts(updatedCourts)
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
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
          courts={courts} // Pass courts data to show checked & disabled players
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
              courtNumber={index + 1}
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
