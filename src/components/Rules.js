import React from 'react'

function Rules() {
  const rules = [
    'Add Court, Players from the menu.',
    'Once players and courts are added, select the first player from waiting bay.',
    'Once players are assigned to court, select start game and end game respectively.',
    'Players selection based on groups:',
    'Div 1 player can either select player from their own group or from div2.',
    'Div 2 player can either select player from their own group or from div1 or from leisure.',
    'Leisure player can either select player from their own group or from div 2.',
  ]
  return (
    <ul class="text-sm md:text-base lg:text-lg p-4 list-disc list-inside">
      {rules.map((x) => (
        <li class="mb-2 md:mb-0">{x}</li>
      ))}
    </ul>
  )
}

export default Rules
