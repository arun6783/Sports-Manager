import React from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/About-Us";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import Header from "./Components/Header-Component/Header-Component";
import SignInAndSignUp from "./Pages/Sign-In-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/user.actions";
import SignIn from "./Components/sign-in/sign-in-component";
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // createUserProfileDocument(user);

      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      //console.log('this line incase if user auth is null', userAuth);
      //but this line of code will be called as soon as user logs in , because creaete userprofiledocument onsnapshot is async.
      //here user auth will be just the object what firebase returns.
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header></Header>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route
            exact
            path="/SignIn"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/"/>
              ) : (
                <SignInAndSignUp />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
