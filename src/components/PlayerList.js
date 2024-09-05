import React from 'react'

const PlayerList = ({ players, onEdit, onDelete }) => {
  return (
    <div className="list-group">
      {players.map((player, index) => (
        <div
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            {player.name} - {player.tier ? `Tier: ${player.tier}` : 'No Tier'}
          </div>
          <div>
            <button
              className="btn btn-sm btn-primary me-2"
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
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlayerList
