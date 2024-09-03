// src/components/Dashboard.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [club, setClub] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
          setUser(userDoc.data())
          const clubDoc = await getDoc(doc(db, 'clubs', currentUser.uid))
          setClub(clubDoc.data())
        } catch (error) {
          console.error('Error fetching user data: ', error)
        }
      } else {
        navigate('/login')
      }
    }
    fetchUserData()
  }, [navigate])

  if (!user || !club) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>
        Welcome {user.firstName} to {club.clubName}
      </h2>
      <Link to="/add-player">Add Player</Link>
      <Link to="/set-admin">Set Player as Admin</Link>
      <Link to="/configure-club-night">Configure Club Night</Link>
      <Link to="/manage-games">Manage Games</Link>
    </div>
  )
}

export default Dashboard
