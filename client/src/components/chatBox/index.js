import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
		const { err } = this.props;
		const errMsg = "There was an error while loading the chat component...";

		return (
			<div id="chatbox">
				{ err ? <div className="err">{errMsg}</div> : null }
				<ChatFeed
					messages={test}
					isTyping={false}
					showSenderName
					maxHeight="20em"
				/>
				<form onSubmit={console.log}>
					<input type="text" id="inputbox" />
					<button type="submit" id="sendbtn">Send</button>
				</form>
			</div>
		);

	}
}

ChatBox.propTypes = {
	err: PropTypes.bool.isRequired,
};

export default ChatBox;
