import React from 'react'
import './Sign-In-sign-up-styles.scss'
import SignIn from "../Components/sign-in/sign-in-component"
import SignUp from '../Components/signup-component/signup.component'


const SignInAndSignUp = () => {

  return (
    <div className='sign-in-and-sign-up'>
    <SignIn />
    <SignUp></SignUp>
  </div>
  )

}
export default SignInAndSignUp;