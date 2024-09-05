import React, { useState } from 'react'

function CourtForm({ onSave, closeModal }) {
  const [courtName, setCourtName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ courtName })
    closeModal()
  }

  const handlecourtNameChange = (e) => {
    setCourtName(e.target.value)
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="courtName" className="form-label">
          Court Name
        </label>
        <input
          type="text"
          id="courtName"
          className="form-control"
          placeholder="Enter court name"
          value={courtName}
          onChange={handlecourtNameChange}
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CourtForm
