import React, { Component } from 'react';

import './styles.css';

import Signup from '../../components/signup';
import RoomList from '../../components/roomList';
import RoomPannel from '../../components/roomPannel';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [], // rooms the user has joined in the past (only rooms that are active)
      user: {username: "pablo"}, // user info, if null that means user is not logged in
    }
  }

  render() {
    const { user, rooms } = this.state;

    return (
      <>
        <div id="welcome">
          { user ? `Welcome back ${user.username}` : "Welcome to the chat app" }
        </div>
        <hr />
        { 
          user ?
          <>
            <RoomPannel />
            <hr />
            {/* <RoomList /> */}
          </>
          : 
          <Signup />
        }
      </>
    );
  }
}


export default Home;
