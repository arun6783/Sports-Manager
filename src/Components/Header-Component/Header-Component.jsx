import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import "./Header-Component.scss";
import {auth} from '../../firebase/firebase.utils';

const Header = ({currentUser}) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/" >
        <Logo className="logo"></Logo>
      </Link>
      <div className="options">
        <Link className='option' to='/AboutUs'>About Us</Link>
        <Link className='option' to='/ContactUs'>Contact Us</Link>
        
      
        { 
          currentUser ? (<div className='option' onClick={()=>auth.signOut()}>Sign out</div>) : (<Link className='option' to='/SignIn'>Sign In</Link>)
        }
      </div>

    </div>
  );
};

export default Header;
