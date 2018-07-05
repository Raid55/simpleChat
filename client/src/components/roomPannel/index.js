import React, { Component } from 'react';

import './styles.css';

class RoomPannel extends Component {

  render() {
    const { err } = this.props;

    return (
      <div id="roomPannel-container">
        <div className="info">
          Create a chat room, once you 
          have a room you can invite as many people as you want
          by giving them your room id.
        </div>
        <button>Create a New Room</button>
        { err ? <div className="err">There was an error while logging you in</div> : null }
        <hr />
        <div className="info">
          Paste the 8 alphanumeric id to join that room
        </div>
        <input></input>
        <button>Join Room</button>
        { err ? <div className="err">There was an error while logging you in</div> : null }
      </div>
    );
  }
}

export default RoomPannel;
