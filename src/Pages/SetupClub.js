import React, { useState, useEffect } from 'react'
import AddPlayers from './AddPlayers'
import { useMessage } from '../Context/MessageContext'

const SetupClub = () => {
  const [clubName, setClubName] = useState('')
  const [rules, setRules] = useState('round-robin')
  const [numCourts, setNumCourts] = useState(1)
  const [players, setPlayers] = useState([])
  const [isNewClub, setIsNewClub] = useState(false)
  const [loading, setLoading] = useState(true)

  const { showMessage } = useMessage()

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch('/api/saveClub?clubName=YourClubName')
        if (response.ok) {
          const club = await response.json()
          setClubName(club.name)
          setRules(club.rules)
          setNumCourts(club.numCourts)
          setPlayers(club.players)
          setIsNewClub(false)
        } else if (response.status === 404) {
          // No club data found, assume this is a new club
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

  const handleSavePlayers = (newPlayers) => {
    setPlayers([...players, ...newPlayers])
  }

  const handleSaveClub = async () => {
    try {
      const response = await fetch('/api/saveClub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clubName, rules, numCourts, players }),
      })

      if (!response.ok) {
        throw new Error('Failed to save the club')
      }
      showMessage('success', 'Club saved successfully')
    } catch (error) {
      showMessage('error', error.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1>{isNewClub ? 'Setup New Club' : 'Edit Club'}</h1>
      <div className="my-4">
        <label className="block text-lg">Club Name:</label>
        <input
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          placeholder="Enter club name"
        />
      </div>
      <div className="my-4">
        <label className="block text-lg">Select Club Night Rules:</label>
        <select value={rules} onChange={(e) => setRules(e.target.value)}>
          <option value="round-robin">Round Robin</option>
          <option value="regular-peg">Regular Peg</option>
          <option value="multi-tier-peg">Multi-Tier Peg</option>
        </select>
      </div>
      <div className="my-4">
        <label className="block text-lg">Number of Courts:</label>
        <input
          type="number"
          value={numCourts}
          onChange={(e) => setNumCourts(e.target.value)}
          min="1"
        />
      </div>
      <AddPlayers onSavePlayers={handleSavePlayers} />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSaveClub}
      >
        {isNewClub ? 'Save Club' : 'Update Club'}
      </button>
    </div>
  )
}

export default SetupClub
