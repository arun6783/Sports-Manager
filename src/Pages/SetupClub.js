import React, { useState, useEffect } from 'react'
import Step1ClubDetails from '../components/Step1ClubDetails'
import Step2Tiers from '../components/Step2Tiers'
import Step3Players from '../components/Step3Players'
import Summary from '../components/Summary'
import { useMessage } from '../Context/MessageContext'
import SetupTierRules from '../components/SetupTierRules'

const SetupClub = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [clubName, setClubName] = useState('Adidda')
  const [rules, setRules] = useState('multi-tier-peg')
  const [numCourts, setNumCourts] = useState(1)
  const [players, setPlayers] = useState([])
  const [tiers, setTiers] = useState([])
  const [tierRules, setTierRules] = useState({})
  const { showMessage } = useMessage()

  // Fetch existing club data on component mount
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`/api/getClub?clubName=${clubName}`)
        if (response.ok) {
          const club = await response.json()
          setClubName(club.clubName)
          setRules(club.rules)
          setNumCourts(club.numCourts)
          setPlayers(club.players)
          setTiers(club.tiers || [])
          setCurrentStep(1) // Reset to the first step
        } else if (response.status === 404) {
          showMessage('warning', 'Club not found. You can create a new club.')
          setPlayers([])
          setTiers([])
        } else {
          throw new Error('Failed to load club data')
        }
      } catch (error) {
        showMessage('error', error.message)
      }
    }
    fetchClubData()
  }, [clubName, showMessage])

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

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
      alert('Club saved successfully')
    } catch (error) {
      alert('Error saving the club: ' + error.message)
    }
  }

  const handleAddTier = (newTierName, newTierColor) => {
    const newTier = { name: newTierName, color: newTierColor }
    setTiers([...tiers, newTier])
    setTierRules({ ...tierRules, [newTierName]: [] })
  }

  const handleRuleChange = (tier, allowedTiers) => {
    setTierRules({ ...tierRules, [tier]: allowedTiers })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ClubDetails
            clubName={clubName}
            setClubName={setClubName}
            rules={rules}
            setRules={setRules}
            numCourts={numCourts}
            setNumCourts={setNumCourts}
            onNext={handleNextStep}
          />
        )
      case 2:
        return rules === 'multi-tier-peg' ? (
          <SetupTierRules
            tiers={tiers}
            setTiers={setTiers}
            tierRules={tierRules}
            handleRuleChange={handleRuleChange}
            handleAddTier={handleAddTier}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        ) : (
          <Step3Players
            players={players}
            setPlayers={setPlayers}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            tiers={tiers}
            rules={rules}
          />
        )
      case 3:
        return (
          <Step3Players
            players={players}
            setPlayers={setPlayers}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            tiers={tiers}
            rules={rules}
          />
        )
      case 4:
        return (
          <Summary
            clubName={clubName}
            rules={rules}
            numCourts={numCourts}
            players={players}
            tiers={tiers}
            onSave={handleSaveClub}
            onPrev={handlePrevStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container">
      <div className="step-numbers mb-4">
        <h4>
          Step {currentStep} of {rules === 'multi-tier-peg' ? 4 : 3}
        </h4>
      </div>
      {renderStep()}
    </div>
  )
}

export default SetupClub
