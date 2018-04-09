import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import httpClient from './httpClient'

import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Home from './views/Home'

class App extends Component {

  state = { currentUser: httpClient.getCurrentUser() }

  onLoginSuccess(user) {
    this.setState({ currentUser: httpClient.getCurrentUser() })
  }

  logOut() {
    httpClient.logOut()
    this.setState({ currentUser: null })
  }

  render() {
    return (
      <div className="App container">
        
        <Switch>
          <Route path="/login" render={(props) => {
            return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
          }} />

          <Route path="/logout" render={(props) => {
            return <LogOut onLogOut={this.logOut.bind(this)}  />
          }} />

          <Route path="/signup" render={(props) => {
            return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
          }} />

          <Route path="/" component={Home} />

        </Switch>

      </div>
    );
  }
}

export default App;
