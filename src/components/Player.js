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
        return 'bg-red-500'
      case PLAYER_GROUP.DIV2:
        return 'bg-green-500'
      case PLAYER_GROUP.LEISURE:
        return 'bg-gray-500'
      default:
        return 'bg-white'
    }
  }

  return (
    <div id="PlayerContainer" className="relative  m-2">
      <div
        className={`p-2 m-2 w-16 ${
          isNext ? 'border-indigo-900' : 'border-transparent'
        } ${bgColor(group)}
       border-4 rounded-lg shadow ${
         isEnabled
           ? 'cursor-pointer hover:bg-blue-100'
           : 'opacity-50 cursor-not-allowed'
       }`}
        onClick={() => isEnabled && onSelect(name, group)}
      >
        <h3 className="font-bold">{name}</h3>
        {isSelected && <div className="text-green-500">✔️</div>}
      </div>
      {isSelected && (
        <button
          className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
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
