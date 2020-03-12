import React from "react";
import './App.css';
import HomePage from "./Pages/HomePage";
import AboutUs from './Pages/About-Us'
import { Switch, Route } from 'react-router-dom';
import Header from "./Components/Header-Component/Header-Component";
import SignInAndSignUp from "./Pages/Sign-In-sign-up";
import { auth } from './firebase/firebase.utils';
class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentUser:null
    }
  }


  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user=> {
      this.setState({currentUser: user});
      console.log(user);
    });

  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}></Header>

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/AboutUs' component={AboutUs} />
          <Route exact path='/SignIn' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }

}
export default App;