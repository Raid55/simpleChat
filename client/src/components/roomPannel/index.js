import React, { Component } from 'react';

import './styles.css';

class RoomPannel extends Component {
  render() {
    return (
      <div id="roomPannel-container">
        <div className="info">
          Create a chat room, once you 
          have a room you can invite as many people as you want
          by giving them your room id.
        </div>
        <button>Create a New Room</button>
      </div>
    );
  }
}

export default RoomPannel;
