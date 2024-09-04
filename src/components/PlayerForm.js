import React, { useState } from 'react'

function PlayerForm({ onSave, closeModal }) {
  const [playerName, setPlayerName] = useState('')
  const [playerGroup, setPlayerGroup] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave([{ name: playerName, group: playerGroup }])
    closeModal()
  }

  return (
    <div id="playerForm" className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playerName"
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Group
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playerGroup"
            type="text"
            placeholder="Player Group"
            value={playerGroup}
            onChange={(e) => setPlayerGroup(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default PlayerForm
