import React, { Component } from 'react';
import './styles.css';

class Login extends Component {
  render() {
    return (
      <div className='login'>
        <h1>Welcome to Chat! :D</h1>
        <p>Enter in a name</p>
        <input type="text"/>
        <button className='loginBtn'>Login</button>
      </div>
    );
  }
}


export default Login;
