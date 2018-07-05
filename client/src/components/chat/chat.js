import React, { Component } from 'react';
import './styles.css';

class Chat extends Component {
  render() {
    return (
      <>
        <div className='chat'>
          <div className="messages">
            <div className='userMsg'>
              it smells like updawg here
            </div>

            <div className='receiveMsg'>
              Whats updawg?
            </div>
          

            <div className='userMsg'>
              it smells like updawg here
            </div>

            <div className='receiveMsg'>
              Whats updawg?
            </div>
          

            <div className='userMsg'>
              it smells like updawg here
            </div>

            <div className='receiveMsg'>
              Whats updawg?
            </div>

            <div className='userMsg'>
              it smells like updawg here
            </div>

            <div className='receiveMsg'>
              Whats updawg?
            </div>

            <div className='userMsg'>
              it smells like updawg here
            </div>

            <div className='receiveMsg'>
              Whats updawg?
            </div>

            <div className='userMsg'>
              it smells like updawg here
            </div>

            <div className='receiveMsg'>
              Whats updawg?
            </div>
          </div>

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
