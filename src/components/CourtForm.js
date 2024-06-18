import React, { useState } from 'react'

function CourtForm({ onSave, closeModal }) {
  const [courtName, setCourtName] = useState(null)
  const handleSubmit = () => {
    onSave({ courtName })
    closeModal()
  }

  const handlecourtNameChange = (e) => {
    setCourtName(e.target.value)
  }
  return (
    <div id="courtForm" className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="courtName"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="courtName"
            type="text"
            placeholder="courtName"
            required
            onChange={handlecourtNameChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="m-2 p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="m-2 p-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourtForm
