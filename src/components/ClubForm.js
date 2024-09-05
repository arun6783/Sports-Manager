import React from 'react'

const ClubForm = ({
  clubName,
  rules,
  numCourts,
  onClubNameChange,
  onRulesChange,
  onNumCourtsChange,
  onOpenTierModal,
}) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Club Information</h4>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="clubName" className="form-label">
            Club Name:
          </label>
          <input
            type="text"
            id="clubName"
            className="form-control"
            value={clubName}
            onChange={onClubNameChange}
            placeholder="Enter club name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rules" className="form-label">
            Select Club Night Rules:
          </label>
          <select
            id="rules"
            className="form-select"
            value={rules}
            onChange={(e) => {
              onRulesChange(e)
              if (e.target.value === 'multi-tier-peg') {
                onOpenTierModal()
              }
            }}
          >
            <option value="round-robin">Round Robin</option>
            <option value="regular-peg">Regular Peg</option>
            <option value="multi-tier-peg">Multi-Tier Peg</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="numCourts" className="form-label">
            Number of Courts:
          </label>
          <input
            type="number"
            id="numCourts"
            className="form-control"
            value={numCourts}
            onChange={onNumCourtsChange}
            min="1"
          />
        </div>
      </div>
    </div>
  )
}

export default ClubForm
