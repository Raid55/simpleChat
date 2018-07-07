import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { Emojione } from 'react-emoji-render';
import { ChatFeed, Message } from 'react-chat-ui'
import ReactTooltip from 'react-tooltip'

import stockClient from '../../utils/stockCalls.js';

class ChatBox extends Component {
	constructor (props) {
		super(props);
		this.state = {
			messages: [],
			stockPrices: {},
			stockList: [],
			err: false,
		};

		// Main functions
		this.convertMsgsAndAddAll = this.convertMsgsAndAddAll.bind(this);
		this.convertAndAddMsg = this.convertAndAddMsg.bind(this);
		this.loadAllStocks = this.loadAllStocks.bind(this);
	}

	// this function parses each message and adds the correct value in an array ro be rendered
	// if its stock add span for toll-tip
	// if its emoji add emoji component with text inside of it
	// else just return the regular text
	parseMsg (msg) {
		return msg.split(/(\s+)/).map((el, idx) => {
			if (el.match(/:\S+:/g)) {
				return <Emojione key={idx} text={el} />;
			}
			else if (el.match(/\$[a-zA-Z]+/g)) {
				return <span key={idx} data-tip data-for={el.substr(1).toUpperCase()} className="stockTag">{el}</span>
			}
			else {
				return el;
			}
		});
	}
	// This function looks complicated so im gonna break it down
	// First we wrap everything around Array.from(new Set()) to
	// get all unique values, then we use [].concat(...), this is to merge
	// all the arrays that will be returned from the maps function, ... is spread
	// operator, then we use regexp to find anything that looks like a stock ticker
	// and voila, now we know all the tickers that need to be loaded.
	parseForAllStocks (msgs) {
		return Array.from(new Set(
			[].concat(...msgs.map(el => el.text).map(el => {
				return el.split(/(\s+)/).map(el => {
					if (el.match(/\$[a-zA-Z]+/g)) return el.substr(1).toUpperCase(); else return null;
				});
			})).filter(v => v),
		));
	}

	// converts from mongodb messages to react-msg-ui messages
	// this runs onetime for all messages initialy
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

	// converts from mongodb messages to react-msg-ui messages
	// adds messages to message list as recived through socket IO
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

	// loads all stock from stock list
	loadAllStocks () {
		stockClient.getStocks(this.state.stockList)
			.then(re => {
				this.setState({
					stockPrices: Object.keys(re).reduce((accu, el) => {
						accu[el] = re[el].quote.latestPrice;
						return accu;
					}, {}),
				});
				return re;
			})
			.catch(err => {
				console.log("error loading stocks: ", err);
				this.setState({
					err: true,
				})
			});
	}

	componentDidMount () {
		this.convertMsgsAndAddAll(this.props.messages);
	}

	componentDidUpdate() {
		if (this.state.stockList.length !== Object.keys(this.state.stockPrices).length && !this.state.err) {
			console.log("here");
			this.loadAllStocks(this.state.stockList);
		}
	}

	render() {
		const { messages, stockPrices } = this.state;
		const { err, onChange, sendMsg, chatMsgValue } = this.props;
		const errMsg = "There was an error while loading the chat or sending a message";
		const stockErrMsg = "There was an error while loading stock tickers";
		const maxChatboxHeight = "20em"; // the max size of the chat box

		return (
			<div id="chatbox">
				{ err ? <div className="err">{errMsg}</div> : null }
				{ this.state.err ? <div className="err">{stockErrMsg}</div> : null }
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
					{
						Object.keys(stockPrices).length
							? Object.keys(stockPrices).map(el => {
								return (
									<ReactTooltip key={el} id={el} type='dark' effect='solid'>
										<span>{`${stockPrices[el]}$`}</span>
									</ReactTooltip>
								);
							})
							: null
					}
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
