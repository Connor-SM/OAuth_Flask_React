import React, { Component } from 'react';
import './index.css';

class Data extends Component {
  constructor() {
    super();

    this.state = {
      data: {}
    }
  }

  getData = async() => {
    let token = localStorage.getItem('token');

    const URL = 'http://localhost:5000/api/data';

    let response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      }
    });

    let data = await response.json();

    this.setState({ data });

  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <h1>Data</h1>
        <p>You can see this now</p>
        <button onClick={this.getData} className="btn btn-primary">Get Data</button>
        {
          this.state.data.info &&
            <div>
              <h3>Name: {this.state.data.info.name}</h3>
              <h3>Age: {this.state.data.info.age}</h3>
            </div>
        }
      </div>
    );
  }
}

export default Data;
