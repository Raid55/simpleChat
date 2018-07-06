import React, { Component } from 'react';

import './styles.css';

import { ChatFeed, Message } from 'react-chat-ui'

let test = [
  new Message({
    id: 10,
    message: "Yo bro",
    senderName: "dude",
  }),
  new Message({ id: 10, message: "hows it going?"}),
  new Message({
    id: 10,
    message: ["check this stock out ", <span style={{backgroundColor: "yellow"}}>$APLL</span>, " its pretty good"],
    senderName: "dude",
  }),
  new Message({
    senderName: "userWhatever has joined the room",
  }),
  new Message({ id: 0, message: "nice"}),
  new Message({
    id: 10,
    message: "yea its pretty cool",
    senderName: "dude",
  }),
  new Message({ id: 0, message: "i think im gonna buy some..."}),
  new Message({ id: 0, message: "not too much..."}),
  new Message({
    id: 10,
    message: "you scared?",
    senderName: "dude",
  }),
  new Message({ id: 0, message: "no i just dont like gambling that much"}),
  new Message({ id: 0, message: "plus better be safe than sorry"}),
  new Message({
    id: 10,
    message: "hey wana hang out this weekend",
    senderName: "dude",
  }),
  new Message({ id: 0, message: "sure why not"}),
]

class ChatBox extends Component {

  render() {

    return (
      <div id="chatbox">
        <ChatFeed
          messages={test}
          isTyping={false}
          showSenderName
          bubblesCentered={true}
          maxHeight={"20em"}
        />
        <div id="input-container">
          <textarea id="inputbox"></textarea>
          <button id="sendbtn">Send</button>
        </div>
      </div>
    );

  }
}

// TODO PROP TYPES

export default ChatBox;
