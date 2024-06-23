import React from 'react'
import { Link } from 'react-router-dom'

const SetupClub = () => {
  return (
    <div>
      <h1>Setup Club</h1>
      <nav>
        <ul>
          <li>
            <Link to="/add-players">Add Players</Link>
          </li>
          <li>
            <Link to="/setup-rules">Setup Rules</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SetupClub
