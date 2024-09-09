import React, { useState } from 'react'

const Step2Tiers = ({ tiers, setTiers, onNext, onPrev }) => {
  const handleAllowedTiersChange = (tierIndex, allowedTier) => {
    const updatedTiers = [...tiers]
    const allowedTiers = updatedTiers[tierIndex].allowedTiers || []

    if (allowedTiers.includes(allowedTier)) {
      updatedTiers[tierIndex].allowedTiers = allowedTiers.filter(
        (tier) => tier !== allowedTier
      )
    } else {
      updatedTiers[tierIndex].allowedTiers = [...allowedTiers, allowedTier]
    }

    setTiers(updatedTiers)
  }

  return (
    <div>
      <h5>Step 2: Define Tiers and Allowed Selections</h5>
      <ul>
        {tiers.map((tier, index) => (
          <li key={index}>
            <h6>{tier.name}</h6>
            <div>
              <label>Select allowed tiers for {tier.name}:</label>
              {tiers.map((allowedTier, allowedIndex) => (
                <div key={allowedIndex}>
                  <input
                    type="checkbox"
                    value={allowedTier.name}
                    checked={tier.allowedTiers?.includes(allowedTier.name)}
                    onChange={() =>
                      handleAllowedTiersChange(index, allowedTier.name)
                    }
                  />
                  <label>{allowedTier.name}</label>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary" onClick={onPrev}>
        Previous
      </button>
      <button className="btn btn-primary" onClick={onNext}>
        Next
      </button>
    </div>
  )
}

export default Step2Tiers
