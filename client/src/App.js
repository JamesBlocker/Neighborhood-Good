import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import httpClient from './httpClient'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Home from './views/Home'
import Posts from './views/Posts'
import NewPost from './views/NewPost'
import PostDetail from './views/PostDetail'

import Profile from './views/Profile'

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
    const { currentUser } = this.state
    return (
      <div className="App container">

        <NavBar currentUser={currentUser} />
        
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

          <Route path="/posts/new" render={(routeProps) => {
						return currentUser
						? <NewPost {...routeProps}/>
						: <Redirect to="/login" />
					}} />

          <Route exact path="/posts" component={Posts} />

          {/* <Route path="/api/posts/:id" render={(routeProps) => {
            return <PostDetail {...routeProps}/>
          }} /> */}

          <Route  path="/posts/:id" component={PostDetail} />
          
          <Route path="/user/:id" render={(routeProps) => {
						return currentUser
						? <Profile {...routeProps}/>
						: <Redirect to="/login" />
					}} />

          <Route exact path="/" component={Home} />

        </Switch>

      </div>
    );
  }
}

export default App;
