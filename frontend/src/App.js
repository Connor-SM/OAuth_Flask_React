import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import { Switch, Route } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import Data from './views/data';
import SECRET_KEY from './config.js';
let jwt = require('jsonwebtoken');



class App extends Component {
  constructor() {
    super();

    this.state = {
      logged_in: false,
    }
  }

  handleLogin = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = 'http://localhost:5000/api/login';

    // encrypt a token with the proper payload info to send to our api
    let token = jwt.sign(
      { 'email': email, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' } // expires in 1 hour
    );

    // send the token to register the user
    let response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      }
    });

    let data = await response.json();

    // setup message saying registered or error
    if (data.message === 'success') {
      this.setState({ logged_in: true });

      // set the token we receive into local storage
      localStorage.setItem('token', data.token);

      alert('You are now logged in!');
    } else {
      alert(data.message);
    }
  }

  handleRegister = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = 'http://localhost:5000/api/register';

    // encrypt a token with the proper payload info to send to our api
    let token = jwt.sign(
      { 'email': email, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' } // expires in 1 hour
    );

    // send the token to register the user
    let response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      }
    });

    let data = await response.json();

    // setup message saying registered or error
    if (data.message === 'success') {
      alert('You are now registered!')
    } else {
      alert(data.message);
    }
  }

  render() {
    return (
      <div className="App">
        <Header logged_in={this.state.logged_in} />
        <div className="container">
          <Switch>
            <Route exact path='/' render={() => <Login handleLogin={this.handleLogin} />} />

            <Route exact path='/register' render={() => <Register handleRegister={this.handleRegister} />} />

            {
              this.state.logged_in ?
                <Route exact path='/data' render={() => <Data />} /> :
                <p>You're not allowed to access this page, please log in.</p>
            }
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
