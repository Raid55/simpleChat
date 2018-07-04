import React, { Component } from 'react';
import './styles.css';

class Chat extends Component {
  render() {
    return (
      <>
        <div className='chat'>
          This is the chat box
          <div className='msg'>
            <input type="text"/>
            <button>Send</button>
          </div>
        </div>
      </>
    );
  }
}


export default Chat;
