import React, { Component } from 'react';
import './styles.css';

import Login from '../../components/login/login.js';
import Chat from '../../components/chat/chat.js';


class Home extends Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = {
      
  //   // }
  // }

  render() {
    return (
      <div className='homepage'>
        {/* <Login /> */}
        <Chat />
      </div>
    );
  }
}


export default Home;
