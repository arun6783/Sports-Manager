import React, { useState, useEffect } from 'react'
import { useMessage } from '../Context/MessageContext'
import ClubForm from '../components/ClubForm'
import PlayerList from '../components/PlayerList'
import TierManagementModal from '../components/TierManagementModal'
import PlayerFormModal from '../components/PlayerFormModal'
import TierList from '../components/TierList'

const SetupClub = () => {
  const [clubName, setClubName] = useState('Adidda')
  const [rules, setRules] = useState('round-robin')
  const [numCourts, setNumCourts] = useState(1)
  const [players, setPlayers] = useState([])
  const [tiers, setTiers] = useState([])
  const [isNewClub, setIsNewClub] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isTierModalOpen, setTierModalOpen] = useState(false)
  const [isPlayerModalOpen, setPlayerModalOpen] = useState(false)
  const [playerToEdit, setPlayerToEdit] = useState(null)
  const [tierToEdit, setTierToEdit] = useState(null)

  const { showMessage } = useMessage()

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`/api/getClub?clubName=${clubName}`)
        if (response.ok) {
          const club = await response.json()
          setClubName(club.name)
          setRules(club.rules)
          setNumCourts(club.numCourts)
          setPlayers(club.players)
          setTiers(club.tiers || [])
          setIsNewClub(false)
        } else if (response.status === 404) {
          setIsNewClub(true)
        } else {
          throw new Error('Failed to load club data')
        }
      } catch (error) {
        showMessage('error', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchClubData()
  }, [showMessage])

  const handleSaveClub = async () => {
    try {
      const response = await fetch('/api/saveClub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clubName, rules, numCourts, players, tiers }),
      })

      if (!response.ok) {
        throw new Error('Failed to save the club')
      }
      showMessage('success', 'Club saved successfully')
    } catch (error) {
      showMessage('error', error.message)
    }
  }

  const handleAddPlayer = (player) => {
    if (playerToEdit !== null) {
      const updatedPlayers = players.map((p, index) =>
        index === playerToEdit ? player : p
      )
      setPlayers(updatedPlayers)
      setPlayerToEdit(null)
    } else {
      setPlayers([...players, player])
    }
  }

  const handleEditPlayer = (index) => {
    setPlayerToEdit(index)
    setPlayerModalOpen(true)
  }

  const handleDeletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  const handleAddTier = (tier) => {
    if (tierToEdit !== null) {
      const updatedTiers = tiers.map((t, index) =>
        index === tierToEdit ? tier : t
      )
      setTiers(updatedTiers)
      setTierToEdit(null)
    } else {
      setTiers([...tiers, tier])
    }
  }

  const handleEditTier = (index) => {
    setTierToEdit(index)
    setTierModalOpen(true)
  }

  const handleDeleteTier = (index) => {
    setTiers(tiers.filter((_, i) => i !== index))
  }

  const handleRulesChange = (newRules) => {
    setRules(newRules)
    if (newRules !== 'multi-tier-peg') {
      setTiers([]) // Clear tiers when switching to non-multi-tier rule
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="container">
      <ClubForm
        clubName={clubName}
        rules={rules}
        numCourts={numCourts}
        onClubNameChange={(e) => setClubName(e.target.value)}
        onRulesChange={(e) => handleRulesChange(e.target.value)}
        onNumCourtsChange={(e) => setNumCourts(e.target.value)}
        onOpenTierModal={() => setTierModalOpen(true)}
      />

      {rules === 'multi-tier-peg' && (
        <TierList
          tiers={tiers}
          onEdit={handleEditTier}
          onDelete={handleDeleteTier}
        />
      )}

      <PlayerList
        players={players}
        onEdit={handleEditPlayer}
        onDelete={handleDeletePlayer}
      />
      <button
        className="btn btn-secondary mt-3"
        onClick={() => setPlayerModalOpen(true)}
      >
        Add Player
      </button>
      <button className="btn btn-primary mt-3 ml-3" onClick={handleSaveClub}>
        {isNewClub ? 'Save Club' : 'Update Club'}
      </button>

      <TierManagementModal
        isOpen={isTierModalOpen}
        onClose={() => setTierModalOpen(false)}
        onSave={handleAddTier}
        tiers={tiers}
        tierToEdit={tierToEdit !== null ? tiers[tierToEdit] : null}
      />

      <PlayerFormModal
        isOpen={isPlayerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
        onSave={handleAddPlayer}
        playerToEdit={playerToEdit !== null ? players[playerToEdit] : null}
        tiers={tiers}
      />
    </div>
  )
}

export default SetupClub
