import React, { Component } from 'react';

import './styles.css';

class RoomList extends Component {
  
  render() {
    const { err } = this.props;

    return (
      <div id="roomList-container">
        <div className="info"> This is a list of rooms you previously joined </div>
        <div id="roomList-holder">
          {/* <div className="noItemInList"> No rooms...yet...</div> */}
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
          <div className="listItem">OhhhWEEEEEEE</div>
        </div>
      </div>
    );
  }
}

export default RoomList;
