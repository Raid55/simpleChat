import React, { Component } from 'react';

import './styles.css';

import Signup from '../../components/signup';
import RoomList from '../../components/roomList';
import RoomCreate from '../../components/roomCreate';
import RoomJoin from '../../components/roomJoin';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [], // rooms the user has joined in the past (only rooms that are active)
      // user: {username: "pablo"}, // user info, if null that means user is not logged in
      user: null,
    }
  }

  render() {
    const { user, rooms } = this.state;

    return (
      <>
        <div className="title">
          { user ? `Welcome back ${user.username}` : "Welcome to the chat app" }
        </div>
        <hr />
        { 
          user ?
          <div id="home-container">
            <RoomCreate />
            <hr />
            <RoomJoin />
            <hr />
            <RoomList />
          </div>
          : 
          <Signup />
        }
      </>
    );
  }
}


export default Home;
