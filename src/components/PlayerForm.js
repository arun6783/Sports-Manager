import React, { useState } from 'react'
import { PLAYER_GROUP } from '../shared/Constants'

function PlayerForm({ onSave, closeModal }) {
  const playerGroups = [
    PLAYER_GROUP.DIV1,
    PLAYER_GROUP.DIV2,
    PLAYER_GROUP.LEISURE,
  ]
  const predefinedPlayers = [
    { name: 'Raghu', group: PLAYER_GROUP.DIV1 },
    { name: 'Mahi', group: PLAYER_GROUP.DIV1 },
    { name: 'Ranjith', group: PLAYER_GROUP.LEISURE },
    { name: 'Ramana', group: PLAYER_GROUP.LEISURE },
    { name: 'Arun', group: PLAYER_GROUP.DIV2 },
    { name: 'Rajesh', group: PLAYER_GROUP.DIV2 },
    { name: 'Nitin', group: PLAYER_GROUP.DIV2 },
    { name: 'Swapnil', group: PLAYER_GROUP.DIV2 },
    { name: 'Badri', group: PLAYER_GROUP.LEISURE },
    { name: 'Vijay', group: PLAYER_GROUP.DIV2 },
    { name: 'Raj', group: PLAYER_GROUP.DIV2 },
    { name: 'Pandian', group: PLAYER_GROUP.DIV2 },
    { name: 'Nick', group: PLAYER_GROUP.LEISURE },
    { name: 'Pazhani', group: PLAYER_GROUP.LEISURE },
    { name: 'Jaga', group: PLAYER_GROUP.DIV2 },
    { name: 'Imtiaz', group: PLAYER_GROUP.DIV2 },
    { name: 'Prasad', group: PLAYER_GROUP.LEISURE },
    { name: 'Ramprasad Dhana', group: PLAYER_GROUP.LEISURE },
    { name: 'Suresh', group: PLAYER_GROUP.LEISURE },
  ]

  const [playerName, setPlayerName] = useState('')
  const [playerGroup, setPlayerGroup] = useState('')
  const [formType, setFormType] = useState('predefined')
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value)
  }

  const handlePlayerTypeChange = (e) => {
    setPlayerGroup(e.target.value)
  }

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value)
  }

  const handlePredefinedPlayerChange = (e) => {
    const playerName = e.target.value
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((name) => name !== playerName)
        : [...prev, playerName]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formType === 'predefined') {
      const playersToSave = selectedPlayers.map((playerName) => {
        return predefinedPlayers.find((p) => p.name === playerName)
      })
      onSave(playersToSave)
    } else {
      onSave([{ name: playerName, group: playerGroup }])
    }
    closeModal()
  }

  return (
    <div id="playerForm" className="w-full max-w-md">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <div className="shadow border">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Form Type
            </label>
            <label className="inline-flex items-center m-2">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="formType"
                value="predefined"
                checked={formType === 'predefined'}
                onChange={handleFormTypeChange}
              />
              <span className="ml-2 text-gray-700">Predefined</span>
            </label>
            <label className="inline-flex items-center m-2">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="formType"
                value="manual"
                checked={formType === 'manual'}
                onChange={handleFormTypeChange}
              />
              <span className="ml-2 text-gray-700">Manual</span>
            </label>
          </div>
        </div>

        {formType === 'manual' && (
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="playerName"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="playerName"
                type="text"
                placeholder="playerName"
                value={playerName}
                onChange={handlePlayerNameChange}
                required
              />
            </div>

            <div className="mb-4">
              <div className="shadow border">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Group
                </label>
                {playerGroups.map((type, index) => (
                  <label className="inline-flex items-center m-2" key={type}>
                    <input
                      type="radio"
                      required={index === 0}
                      className="form-radio h-5 w-5 text-blue-600"
                      name="playerType"
                      value={type}
                      checked={playerGroup === type}
                      onChange={handlePlayerTypeChange}
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {formType === 'predefined' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Predefined Players
            </label>
            <ul className="shadow border rounded max-h-48 overflow-y-auto">
              {predefinedPlayers.map((player) => (
                <li key={player.name} className="p-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      value={player.name}
                      checked={selectedPlayers.includes(player.name)}
                      onChange={handlePredefinedPlayerChange}
                    />
                    <span className="ml-2 text-gray-700">
                      {player.name + ' ' + player.group}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

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

export default PlayerForm
