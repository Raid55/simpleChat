import React, { Component } from 'react';

import './styles.css';

class RoomJoin extends Component {

  render() {
    const { err } = this.props;

    return (
      <>
        <div className="info">
          Paste the 8 alphanumeric id to join that room
        </div>
        <input></input>
        { err ? <div className="err">There was an error while joining the room</div> : null }
      </>
    );
  }
}

// TODO PROP TYPES

export default RoomJoin;
