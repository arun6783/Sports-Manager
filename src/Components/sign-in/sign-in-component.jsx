import React from 'react';
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component";

class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email:'',
            password: ''
        }
    }

    handleSubmit =(event)=>{

        event.preventDefault();
        this.setState({email:'', password:''});


    }

    handleChange=event=>{
        const{name, value} = event.target;
        this.setState({[name]:value});
    }
    render() {


        return (

            <div className='sin-in'>
                <h2> I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>


                    <FormInput handleChange={this.handleChange} value={this.state.email} name='email' type='email' required label='Email' />


                    <FormInput name='password' type='password' value={this.state.password} onChange={this.handleChange} required label="Password" />


                    <CustomButton type='submit'> Sign In</CustomButton>
                </form>
            </div>
        );
    }
};
export default SignIn;