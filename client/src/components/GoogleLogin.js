// src/components/GoogleLogin.js
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { auth, googleAuthProvider } from '../firebase'

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Button variant="danger" onClick={handleGoogleLogin}>
        Sign in with Google
      </Button>
    </Container>
  )
}

export default GoogleLogin
