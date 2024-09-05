import React, { useState } from 'react'
import TierList from './TierList'

const Step2Tiers = ({ tiers, setTiers, onNext, onPrev }) => {
  const [tierToEdit, setTierToEdit] = useState(null)

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
  }

  const handleDeleteTier = (index) => {
    setTiers(tiers.filter((_, i) => i !== index))
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 2: Manage Tiers</h5>
      </div>
      <div className="card-body">
        <TierList
          tiers={tiers}
          onEdit={handleEditTier}
          onDelete={handleDeleteTier}
          onTiersChange={handleAddTier}
        />

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={onPrev}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step2Tiers
