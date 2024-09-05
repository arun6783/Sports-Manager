import React from 'react'

const Summary = ({
  clubName,
  rules,
  numCourts,
  players,
  tiers,
  onSave,
  onPrev,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 4: Summary</h5>
      </div>
      <div className="card-body">
        <h6>Club Name: {clubName}</h6>
        <h6>Selected Rules: {rules}</h6>
        <h6>Number of Courts: {numCourts}</h6>
        <h6>Players:</h6>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player.name}</li>
          ))}
        </ul>
        {rules === 'multi-tier-peg' && (
          <>
            <h6>Tiers:</h6>
            <ul>
              {tiers.map((tier, index) => (
                <li key={index}>{tier.name}</li>
              ))}
            </ul>
          </>
        )}
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={onPrev}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={onSave}>
            Save Club
          </button>
        </div>
      </div>
    </div>
  )
}

export default Summary
