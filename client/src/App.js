import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import httpClient from './httpClient'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
