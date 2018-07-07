import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { Emojione } from 'react-emoji-render';
import { ChatFeed, Message } from 'react-chat-ui'
import ReactTooltip from 'react-tooltip'

let test = [
	new Message({
		id: 10,
		message: "Yo bro",
		senderName: "dude",
	}),
	new Message({ id: 10, message: "hows it going?"}),
	new Message({
		id: 10,
		message: ["check this stock out ", <><span data-tip data-for='test' className="stockTag">$APLL</span></>, " its pretty good"],
		senderName: "dude",
	}),
	new Message({
		senderName: "userWhatever has joined the room",
	}),
	new Message({ id: 0, message: "nice"}),
	new Message({
		id: 10,
		message: ["check this stock out ", <><span data-tip data-for='test2' style={{backgroundColor: "yellow"}}>$APLL</span></>, " its pretty good"],
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
	new Message({ id: "5b3d26f68f45e5a46e181b33", message: "plus better be safe than sorry", senderName: "was"}),
	new Message({
		id: "5b3d26f68f45e5a46e181b33",
		message: [ "hey wana hang out this weekend", <Emojione text=":+1:" />, "bro" ],
		senderName: "was",
	}),
	new Message({ id: 0, message: "sure why not"}),
]

class ChatBox extends Component {
	constructor (props) {
		super(props);
		this.state = {
			messages: [],
			stockPrices: {},
			stockList: [],
		};

		// Main functions
		this.convertMsgsAndAddAll = this.convertMsgsAndAddAll.bind(this);
		this.convertAndAddMsg = this.convertAndAddMsg.bind(this);
	}

	parseMsg (msg) {
		return msg.split(/(\s+)/).map((el, idx) => {
			if (el.match(/:\S+:/g)) {
				return <Emojione key={idx} text={el} />;
			}
			else if (el.match(/\$[a-zA-Z]+/g)) {
				return <span key={idx} data-tip data-for={el.substr(1).toLowerCase()} className="stockTag">{el}</span>
			}
			else {
				return el;
			}
		});
	}
	parseForAllStocks (msgs) {
		return Array.from(new Set(
			msgs.map(el => el.text).map(el => {
				return el.split(/(\s+)/).map((el, idx) => {
					if (el.match(/\$[a-zA-Z]+/g)) return el.substr(1).toLowerCase();
				});
			}),
		));
	}
	// loadAllStocks () {

	// }

	convertMsgsAndAddAll (msgs) {
		const { user } = this.props;

		this.setState({
			messages: msgs.map(el => {
				if (el.type === "joined") {
					return new Message({
						message: <Emojione key={el._id} text="Hello :wave:" />,
						senderName: el.text,
					});
				}
				else if (el.type === "text") {
					return new Message({
						id: el.owner._id === user._id ? 0 : el.owner._id,
						message: this.parseMsg(el.text),
						senderName: el.owner.username,
					});
				}
			}),
			stockList: this.parseForAllStocks(msgs),
		});
	}

	convertAndAddMsg (msg) {
		const { user } = this.props;

		this.setState({
			messages: [
				...this.state.messages,
				new Message({
					id: msg._id === user._id ? 0 : msg._id,
					message: parseMsg(msg.text),
					senderName: msg.owner.username,
				})
			],
			stockList: Array.from(new Set([
				...this.state.stockList,
				this.parseForAllStocks([msg]),
			])),
		});
	}

	componentDidMount () {
		this.convertMsgsAndAddAll(this.props.messages);
	}

	// componentDidUpdate() {
	// 	if (this.state.messages.length !== this.props.messages.length) {
	// 		console.log("here")
	// 		this.convertMsgsAndAddAll(this.props.messages);
	// 	}
	// }

	render() {
		const { messages, stockPrices, stockList } = this.state;
		const { err, onChange, sendMsg, chatMsgValue } = this.props;
		const errMsg = "There was an error while loading the chat or sending a message";
		const maxChatboxHeight = "20em"; // the max size of the chat box

		return (
			<div id="chatbox">
				{ err ? <div className="err">{errMsg}</div> : null }
				<ChatFeed
					messages={messages}
					isTyping={false}
					showSenderName
					maxHeight={maxChatboxHeight}
				/>
				<form onChange={onChange} onSubmit={sendMsg}>
					<input type="text" name="chatMsg" value={chatMsgValue} id="inputbox" />
					<button type="submit" id="sendbtn">Send</button>
				</form>
				<>
					<ReactTooltip id='test' type='dark' effect='solid'><span>11$</span></ReactTooltip>
					<ReactTooltip id='test2' type='warning' effect='solid'><span>1231$</span></ReactTooltip>
				</>
			</div>
		);

	}
}

ChatBox.propTypes = {
	err: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	sendMsg: PropTypes.func.isRequired,
	messages: PropTypes.array.isRequired,
	chatMsgValue: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
};

export default ChatBox;
