import React, { useState } from 'react'
import Modal from '../components/Modal'

const TierManagementModal = ({ isOpen, onClose, onSave, tiers }) => {
  const [localTiers, setLocalTiers] = useState(tiers || [])

  const handleAddTier = () => {
    setLocalTiers([...localTiers, { name: '', description: '' }])
  }

  const handleTierChange = (index, field, value) => {
    const updatedTiers = localTiers.map((tier, i) =>
      i === index ? { ...tier, [field]: value } : tier
    )
    setLocalTiers(updatedTiers)
  }

  const handleSave = () => {
    onSave(localTiers)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Tiers">
      <div className="form-group">
        {localTiers.map((tier, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Tier Name"
              value={tier.name}
              onChange={(e) => handleTierChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Description (Optional)"
              value={tier.description}
              onChange={(e) =>
                handleTierChange(index, 'description', e.target.value)
              }
            />
          </div>
        ))}
        <button className="btn btn-secondary mt-2" onClick={handleAddTier}>
          Add Tier
        </button>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default TierManagementModal
