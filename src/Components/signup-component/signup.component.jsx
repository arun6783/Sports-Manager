import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './signup.styles.scss'

export default class SignUp extends React.Component {

    constructor(){
        super();

        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        };
    }
    handleChange = (e)=>{
        const {name, value} = e.target;
        this.state({
            [name]:value
        });
    }

    handleSubmit= async (e)=>{
        e.preventDefault();
        const { displayName, email , password , confirmPassword}= this.state;

        if(password!==confirmPassword){
            alert("Password don't match");
        }

        try{

            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            });

        }catch(error){
            console.log(error);

        }
    }

  render() {
      const { displayName, email , password , confirmPassword}= this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do no have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput text='text' name='displayName' value={displayName} handleChange={this.handleChange} label='Display Name' required/>
            <FormInput text='text' name='email' value={email} handleChange={this.handleChange} label='Email' required/>
            <FormInput text='text' name='password' value={password} handleChange={this.handleChange} label='Password' required/>
            <FormInput text='text' name='confirmPassword' value={confirmPassword} handleChange={this.handleChange} label='Confirm Password' required/>
            <CustomButton type='submit'>Sign up</CustomButton>
        </form>
      </div>
    )
  }
}
