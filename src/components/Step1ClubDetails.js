// Step1ClubDetails.js
import React, { useState } from 'react'

const Step1ClubDetails = ({
  clubName,
  setClubName,
  rules,
  setRules,
  numCourts,
  setNumCourts,
  onNext,
}) => {
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    let formErrors = {}
    if (!clubName) formErrors.clubName = 'Club name is required'
    if (numCourts < 1)
      formErrors.numCourts = 'Number of courts must be at least 1'
    if (!rules) formErrors.rules = 'Please select a rule'

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      setErrors({})
      onNext()
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 1: Club Details</h5>
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
            onChange={(e) => setClubName(e.target.value)}
            placeholder="Enter club name"
          />
          {errors.clubName && (
            <small className="text-danger">{errors.clubName}</small>
          )}
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
            onChange={(e) => setNumCourts(e.target.value)}
            min="1"
          />
          {errors.numCourts && (
            <small className="text-danger">{errors.numCourts}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="rules" className="form-label">
            Select Club Night Rules:
          </label>
          <select
            id="rules"
            className="form-select"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          >
            <option value="">Select a rule</option>
            <option value="round-robin">Round Robin</option>
            <option value="regular-peg">Regular Peg</option>
            <option value="multi-tier-peg">Multi-Tier Peg</option>
          </select>
          {errors.rules && (
            <small className="text-danger">{errors.rules}</small>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Step1ClubDetails
