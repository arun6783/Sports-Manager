import React from 'react'
import { PLAYER_GROUP } from '../shared/Constants'

function Player({
  name,
  group,
  isNext,
  isSelected,
  onSelect,
  isEnabled,
  removePlayer,
}) {
  const bgColor = (group) => {
    switch (group) {
      case PLAYER_GROUP.DIV1:
        return 'bg-danger'
      case PLAYER_GROUP.DIV2:
        return 'bg-success'
      case PLAYER_GROUP.LEISURE:
        return 'bg-secondary'
      default:
        return 'bg-light'
    }
  }

  return (
    <div className="d-inline-block m-2">
      <div
        className={`p-2 ${bgColor(group)} border ${
          isNext ? 'border-primary' : 'border-light'
        } rounded-lg shadow ${
          isEnabled ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={() => isEnabled && onSelect(name, group)}
      >
        <h5 className="mb-0">{name}</h5>
        {isSelected && <div className="text-success">✔️</div>}
      </div>
      {isSelected && (
        <button
          className="btn btn-sm btn-outline-danger position-absolute top-0 end-0"
          onClick={() => {
            removePlayer()
          }}
        >
          ❌
        </button>
      )}
    </div>
  )
}

export default Player
