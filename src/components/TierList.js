// TierList.js
import React, { useState } from 'react'

const TierList = ({ tiers, onTiersChange }) => {
  const [newTier, setNewTier] = useState({ name: '', description: '' })
  const [editIndex, setEditIndex] = useState(null)

  const handleSaveTier = () => {
    if (newTier.name.trim() === '') return // Don't add empty tiers

    if (editIndex !== null) {
      const updatedTiers = tiers.map((tier, index) =>
        index === editIndex ? newTier : tier
      )
      onTiersChange(updatedTiers)
      setEditIndex(null)
    } else {
      onTiersChange([...tiers, newTier])
    }
    setNewTier({ name: '', description: '' })
  }

  const handleEditTier = (index) => {
    setEditIndex(index)
    setNewTier(tiers[index])
  }

  const handleDeleteTier = (index) => {
    onTiersChange(tiers.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
      setNewTier({ name: '', description: '' })
    }
  }

  const handleClear = () => {
    setNewTier({ name: '', description: '' })
    setEditIndex(null)
  }

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Manage Tiers</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, index) => (
              <tr key={index}>
                <td>{tier.name}</td>
                <td>{tier.description || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditTier(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTier(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter tier name"
                  value={newTier.name}
                  onChange={(e) =>
                    setNewTier({ ...newTier, name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter description (optional)"
                  value={newTier.description}
                  onChange={(e) =>
                    setNewTier({ ...newTier, description: e.target.value })
                  }
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={handleSaveTier}
                >
                  {editIndex !== null ? 'Save' : 'Add'}
                </button>
                {editIndex !== null && (
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleClear}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TierList
