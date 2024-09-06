import React from 'react'

const PlayerList = ({
  players,
  onEdit,
  onDelete,
  newPlayer,
  setNewPlayer,
  handleSavePlayer,
  handleClear,
  tiers,
  rules,
  editIndex,
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Group</th>
          {rules === 'multi-tier-peg' && <th>Tier</th>}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td>{player.name}</td>
            <td>{player.group}</td>
            {rules === 'multi-tier-peg' && <td>{player.tier || 'N/A'}</td>}
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(index)}
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
              placeholder="Enter player name"
              value={newPlayer.name}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, name: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              placeholder="Enter group"
              value={newPlayer.group}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, group: e.target.value })
              }
            />
          </td>
          {rules === 'multi-tier-peg' && (
            <td>
              <select
                className="form-select"
                value={newPlayer.tier}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, tier: e.target.value })
                }
              >
                <option value="">Select Tier</option>
                {tiers.map((tier, index) => (
                  <option key={index} value={tier.name}>
                    {tier.name}
                  </option>
                ))}
              </select>
            </td>
          )}
          <td>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={handleSavePlayer}
            >
              {newPlayer.name !== '' && editIndex !== null ? 'Save' : 'Add'}
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
  )
}

export default PlayerList
