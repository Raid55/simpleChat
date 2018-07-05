import React, { Component } from 'react';

import './styles.css';

class Signup extends Component {
  
  render() {
    const { err } = this.props;

    return (
      <div id='signup-container'>
        <div className="info">
          Pick a screen name to continue...
        </div>
        <input></input>
        <button>Log in</button>
        { err ? <div className="err">There was an error while logging you in</div> : null }
      </div>
    );
  }
}

export default Signup;
