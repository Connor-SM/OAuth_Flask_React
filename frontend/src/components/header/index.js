import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <nav className="navbar navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">Login</NavLink>
          <NavLink className="navbar-brand" to="/register">Register</NavLink>
          {
            this.props.logged_in &&
              <NavLink className="navbar-brand" to="/data">Data</NavLink>
          }
        </nav>
      </header>
    );
  }
}

export default Header;
