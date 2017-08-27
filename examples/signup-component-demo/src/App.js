import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withRouter } from 'react-router-dom';
import Routes from './Routes';

class App extends Component {

  state = {
    userToken: null
  };

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken
    });
  }

  render() {

    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
