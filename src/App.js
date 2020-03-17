import React from "react";
import './App.css';
import HomePage from "./Pages/HomePage";
import AboutUs from './Pages/About-Us'
import { Switch, Route } from 'react-router-dom';
import Header from "./Components/Header-Component/Header-Component";
import SignInAndSignUp from "./Pages/Sign-In-sign-up";
import { auth , createUserProfileDocument } from './firebase/firebase.utils';
class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentUser:null
    }
  }


  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=> {  
        // createUserProfileDocument(user);

        if(userAuth){
          const userRef = createUserProfileDocument(userAuth);
          (await userRef).onSnapshot(snapShot=>{
            this.setState({
              currentUser: { 
                id: snapShot.id,
                ...snapShot.data()
              }
            }, ()=>{

              console.log(this.state);
            });
          });
    
        }
        //console.log('this line incase if user auth is null', userAuth);
        //but this line of code will be called as soon as user logs in , because creaete userprofiledocument onsnapshot is async.
        //here user auth will be just the object what firebase returns.
        this.setState({currentUser: userAuth});
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