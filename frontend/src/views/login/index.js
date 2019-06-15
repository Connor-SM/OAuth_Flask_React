import React, { Component } from 'react';
import './index.css';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={this.props.handleLogin}>
              <input className="form-control" type="text" name="email" placeholder="Email..." />
              <input className="form-control" type="password" name="pass" placeholder="Password..." />
              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
