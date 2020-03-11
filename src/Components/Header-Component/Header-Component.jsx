import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import "./Header-Component.scss";

const Header = () => {
  return (
    <div className="header">
      <Link className="logo-container" to="/" >
        <Logo className="logo"></Logo>
      </Link>
      <div className="options">
        <Link className='option' to='/AboutUs'>About Us</Link>
        <Link className='option' to='/ContactUs'>Contact Us</Link>
      </div>

    </div>
  );
};

export default Header;
