import React from "react";
import "./styles.css";
import HomePage from "./Pages/HomePage";
import AboutUs from './Pages/About-Us'
import { Switch, Route } from 'react-router-dom';
import Header from "./Components/Header-Component/Header-Component";
import SignInAndSignUp from "./Pages/Sign-In-sign-up";

export default function App() {
  return (
    <div className="App">
      <Header></Header>

      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/AboutUs' component={AboutUs}/>
        <Route exact path='/SignIn' component={SignInAndSignUp}/>
      </Switch>
    </div>
  );
}

