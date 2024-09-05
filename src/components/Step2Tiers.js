import React, { useState } from 'react'
import TierList from './TierList'

const Step2Tiers = ({ tiers, setTiers, onNext, onPrev }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 2: Manage Tiers</h5>
      </div>
      <div className="card-body">
        <TierList tiers={tiers} setTiers={setTiers} />

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
