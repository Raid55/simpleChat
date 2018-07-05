import React, { Component } from 'react';

import './styles.css';

class RoomCreate extends Component {

  render() {
    const { err } = this.props;

    return (
      <>
        <div className="info">
          Create a chat room, once you 
          have a room you can invite as many people as you want
          by giving them your room id.
        </div>
        <button>Create a New Room</button>
        { err ? <div className="err">There was an error while trying to create a room</div> : null }
      </>
    );
  }
}

// TODO PROP TYPES

export default RoomCreate;
