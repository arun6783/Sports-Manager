// src/components/RegisterClub.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { Alert } from 'react-bootstrap'

const RegisterClub = () => {
  const [clubName, setClubName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegisterClub = async (e) => {
    e.preventDefault()
    const user = auth.currentUser
    if (user) {
      try {
        await setDoc(doc(db, 'clubs', user.uid), {
          clubName,
          ownerId: user.uid,
        })
        navigate('/dashboard')
      } catch (error) {
        setError(error.message)
      }
    }
  }

  return (
    <div>
      <h2>Register Club</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleRegisterClub}>
        <input
          type="text"
          placeholder="Club Name"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <button type="submit">Register Club</button>
      </form>
    </div>
  )
}

export default RegisterClub
