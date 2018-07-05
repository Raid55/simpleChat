import React, { Component } from 'react';

import './styles.css';

class Signup extends Component {
  render() {
    return (
      <div id='signup-container'>
        <div className="info">
          Pick a screen name to continue...
        </div>
        <input></input>
        <button>Log in</button>
      </div>
    );
  }
}

export default Signup;
