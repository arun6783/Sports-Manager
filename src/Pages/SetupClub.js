import React, { useState } from 'react'
import Step1ClubDetails from '../components/Step1ClubDetails'
import Step2Tiers from '../components/Step2Tiers'
import Step3Players from '../components/Step3Players'
import Summary from '../components/Summary'
import { useMessage } from '../Context/MessageContext'

const SetupClub = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [clubName, setClubName] = useState('')
  const [rules, setRules] = useState('round-robin')
  const [numCourts, setNumCourts] = useState(1)
  const [players, setPlayers] = useState([])
  const [tiers, setTiers] = useState([])

  const { showMessage } = useMessage()

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
      showMessage('success', 'Club saved successfully')
    } catch (error) {
      showMessage('error', error.message)
    }
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
          <Step2Tiers
            tiers={tiers}
            setTiers={setTiers}
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
