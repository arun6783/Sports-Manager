import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Court from './components/Court'
import WaitingBay from './components/WaitingBay'
import Modal from './components/Modal'
import CourtForm from './components/CourtForm'
import rotateLeft from './shared/Utils'
import PlayerForm from './components/PlayerForm'
import Rules from './components/Rules'
import { useMessage } from './Context/MessageContext'

// Key for localStorage
const SESSION_KEY = 'badminton_session'
const SESSION_ACTIVE_KEY = 'badminton_session_active'

function App() {
  const { showMessage } = useMessage()
  const [courts, setCourts] = useState([])
  const [waitingBayPlayers, setWaitingBayPlayers] = useState([])
  const [selectedCourt, setSelectedCourt] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [isSessionActive, setSessionActive] = useState(false)

  // Load session state from local storage
  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_KEY)
    const sessionActive = localStorage.getItem(SESSION_ACTIVE_KEY)
    if (savedSession) {
      const { courts, waitingBayPlayers } = JSON.parse(savedSession)
      setCourts(courts)
      setWaitingBayPlayers(waitingBayPlayers)
      if (sessionActive === 'true') {
        setSessionActive(true)
      }
    }
  }, [])

  // Save session state to local storage
  useEffect(() => {
    if (isSessionActive) {
      const sessionState = { courts, waitingBayPlayers }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionState))
    }
  }, [courts, waitingBayPlayers, isSessionActive])

  const handleCourtSelect = (court) => {
    if (court.enabled) {
      setSelectedCourt(selectedCourt === court.id ? 0 : court.id)
    }
  }

  const handleCourtEndGame = (id) => {
    const court = courts.find((court) => court.id === id)
    if (court) {
      const playersInCourt = court.players
      court.players = []
      setWaitingBayPlayers([
        ...waitingBayPlayers,
        ...rotateLeft(playersInCourt),
      ])
    }
  }

  const handleEnableDisableCourt = (id) => {
    setCourts(
      courts.map((court) => {
        if (court.players.length === 0 && court.id === id) {
          court.enabled = !court.enabled
        }
        return court
      })
    )
  }

  const handleAssignCourt = (selectedPlayers) => {
    const availableCourt = courts.find(
      (court) => court.enabled && court.players.length === 0
    )
    if (availableCourt) {
      setCourts(
        courts.map((court) =>
          court.id === availableCourt.id
            ? { ...court, players: selectedPlayers }
            : court
        )
      )
      setWaitingBayPlayers(
        waitingBayPlayers.filter(
          (player) =>
            !selectedPlayers.some(
              (selectedPlayer) => selectedPlayer.name === player.name
            )
        )
      )
    }
  }

  const openModal = (content) => {
    setModalContent(content)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleRemovePlayer = (name) => {
    setWaitingBayPlayers(
      waitingBayPlayers.filter((player) => player.name !== name)
    )
  }

  const handlePlayerSave = (savedPlayers) => {
    let validPlayers = []
    let errorMessages = []

    savedPlayers.forEach((savedPlayer) => {
      const presentInWaitingList = waitingBayPlayers.some(
        (p) => p.name === savedPlayer.name
      )
      let presentInCourt = courts.some((court) =>
        court.players.some((x) => x.name === savedPlayer.name)
      )

      if (!presentInWaitingList && !presentInCourt) {
        validPlayers.push(savedPlayer)
      } else {
        errorMessages.push(`User '${savedPlayer.name}' is already present!`)
      }
    })

    if (validPlayers.length > 0) {
      setWaitingBayPlayers((prevPlayers) => [...prevPlayers, ...validPlayers])
    }

    if (errorMessages.length > 0) {
      showMessage('error', errorMessages.join(' '))
    }
  }

  const handleCourtSave = (savedCourt) => {
    const newlySavedCourt = {
      id: courts.length + 1,
      players: [],
      enabled: true,
      ...savedCourt,
    }
    if (!courts.some((court) => court.courtName === savedCourt.courtName)) {
      setCourts([...courts, newlySavedCourt])
    } else {
      showMessage(
        'error',
        `Court '${savedCourt.courtName}' is already present!`
      )
    }
  }

  const startSession = () => {
    setSessionActive(true)
    localStorage.setItem(SESSION_ACTIVE_KEY, 'true')
  }

  const endSession = () => {
    setCourts([])
    setWaitingBayPlayers([])
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(SESSION_ACTIVE_KEY)
    setSessionActive(false)
  }

  const getMenuItems = () => (
    <div>
      <button
        className="dropdown-item border-red-200 border rounded shadow my-2"
        onClick={() => openModal('Player')}
      >
        Add Player
      </button>
      <button
        className="dropdown-item border-red-200 border rounded shadow my-2"
        onClick={() => openModal('Court')}
      >
        Add Court
      </button>
      <button
        className="dropdown-item border-red-200 border rounded shadow my-2"
        onClick={() => openModal('Rules')}
      >
        General Rules
      </button>
    </div>
  )

  const getModalChildComponents = () => {
    switch (modalContent) {
      case 'Player':
        return <PlayerForm onSave={handlePlayerSave} closeModal={closeModal} />
      case 'Court':
        return <CourtForm onSave={handleCourtSave} closeModal={closeModal} />
      default:
        return <Rules />
    }
  }

  const getModalTitle = () => {
    switch (modalContent) {
      case 'Player':
        return 'Add Player'
      case 'Court':
        return 'Add Court'
      default:
        return 'General Rules'
    }
  }

  return (
    <div className="App">
      <div className="flex flex-col min-h-screen">
        <Header menuItems={getMenuItems()} />
        <main>
          <div className="flex justify-between p-4">
            {!isSessionActive &&
              courts.length > 0 &&
              waitingBayPlayers.length > 0 && (
                <button
                  className="p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={startSession}
                >
                  Start Session
                </button>
              )}
            {isSessionActive && (
              <button
                className="p-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={endSession}
              >
                End Session
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center p-4">
            {courts.map((court) => (
              <Court
                key={court.id}
                courtData={court}
                isCourtSelected={court.id === selectedCourt}
                setIsCourtSelected={handleCourtSelect}
                onEndGame={handleCourtEndGame}
                onDisableCourt={handleEnableDisableCourt}
                onEnableCourt={handleEnableDisableCourt}
              />
            ))}
          </div>
          <WaitingBay
            players={waitingBayPlayers}
            removePlayer={handleRemovePlayer}
            onAssignCourt={handleAssignCourt}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={getModalTitle()}
          >
            {getModalChildComponents()}
          </Modal>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
