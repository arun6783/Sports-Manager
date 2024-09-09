import React, { useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'

const SetupTierRules = ({
  tiers,
  setTiers,
  tierRules,
  handleRuleChange,
  handleAddTier,
  onNext,
  onPrev,
}) => {
  const [newTierName, setNewTierName] = useState('')
  const [newTierColor, setNewTierColor] = useState('')

  const handleAddNewTier = () => {
    handleAddTier(newTierName, newTierColor)
    setNewTierName('')
    setNewTierColor('')
  }

  const handleCheckboxChange = (tier, allowedTier) => {
    const currentAllowedTiers = tierRules[tier] || []
    const updatedAllowedTiers = currentAllowedTiers.includes(allowedTier)
      ? currentAllowedTiers.filter((t) => t !== allowedTier) // Remove the tier if unchecked
      : [...currentAllowedTiers, allowedTier] // Add the tier if checked

    handleRuleChange(tier, updatedAllowedTiers)
  }

  return (
    <div>
      <h3>Setup Tier Rules</h3>
      <Form>
        <Form.Group>
          <Form.Label>Tier Name</Form.Label>
          <Form.Control
            value={newTierName}
            onChange={(e) => setNewTierName(e.target.value)}
            placeholder="Enter tier name (e.g., Div1, Red)"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tier Color</Form.Label>
          <Form.Control
            type="color"
            value={newTierColor}
            onChange={(e) => setNewTierColor(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddNewTier}>
          Add Tier
        </Button>
      </Form>

      {tiers.map((tier) => (
        <Card key={tier.name} className="mt-3">
          <Card.Body>
            <Card.Title>
              {tier.name} ({tier.color})
            </Card.Title>
            <Form.Group>
              <Form.Label>Select Allowed Tiers for {tier.name}</Form.Label>
              {tiers.map((t) => (
                <Form.Check
                  key={t.name}
                  type="checkbox"
                  label={t.name}
                  checked={tierRules[tier.name]?.includes(t.name) || false}
                  onChange={() => handleCheckboxChange(tier.name, t.name)}
                />
              ))}
            </Form.Group>
          </Card.Body>
        </Card>
      ))}

      <div className="mt-4">
        <Button variant="secondary" onClick={onPrev}>
          Previous
        </Button>
        <Button variant="primary" onClick={onNext} className="ml-2">
          Next
        </Button>
      </div>
    </div>
  )
}

export default SetupTierRules
