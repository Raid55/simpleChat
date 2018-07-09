import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Redirect }         from 'react-router-dom';

import './styles.css';

import ChatLegend from './chatLegend.js';
import ChatBox    from '../../components/chatBox';

import apiClient  from '../../utils/apiCalls.js';

class Room extends Component {
	constructor (props) {
		super(props);
		this.state = {
			redirect: null,
			textData: {
				chatMsg: "",
			},
			room: null,
			user: null,
			messages: [],
			errs: {
				chatBox: false,
			},
			isLoading: true,
		};

		// Main functions
		this.sendMsg = this.sendMsg.bind(this);
		this.fetchData = this.fetchData.bind(this);
		// helper functions
		this.backBtn = this.backBtn.bind(this);
		this.setChatErr = this.setChatErr.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	backBtn (e) {
		e.preventDefault();

		this.setState({
			redirect: "/",
		});
	}

	setChatErr (err) {
		console.log(err);
		this.setState({
			errs: {
				...this.state.errs,
				chatBox: true,
			},
		});
	}

	onChange (e) {
		e.preventDefault();

		this.setState({
			textData: {
				...this.state.textData,
				[e.target.name]: e.target.value,
			},
		});
	}

	fetchData () {
		const { rId } = this.props.match.params;

		if (apiClient.fetchToken()) {
			apiClient.fetchRoomInfo(rId)
				.then(re => {
					this.setState({
						messages: re.room.messages,
						room: re.room,
						user: re.user,
						isLoading: false,
					});
					return re;
				})
				.catch(err => {
					console.log(err);
					this.setState({
						redirect: '/',
					});
				});
		}
		else {
			this.setState({
				redirect: "/",
			});
		}
	}

	sendMsg (e) {
		e.preventDefault();
		const { rId } = this.props.match.params;

		if (this.state.textData.chatMsg !== "") {
			apiClient.createMsg(rId, this.state.textData.chatMsg)
				.then(re => {
					this.setState({
						textData: {
							...this.state.textData,
							chatMsg: "",
						},
					});
					return re;
				})
				.catch(this.setChatErr);
		}
	}

	componentDidMount () {
		this.fetchData();
	}

	render () {
		const { redirect, errs, room, messages, textData, user, isLoading } = this.state;
		const { rId } = this.props.match.params;

		if (redirect) {
			return (
				<Redirect push to={redirect} />
			);
		}
		else {
			return (
				<div id="chat-container">
					<div className="title">
						{ room ? room.name : "Loading..." }
					</div>
					<div className="info">
						{ room ? `Room ID: ${room.link}` : "..." }
					</div>
					<hr />
					<button onClick={this.backBtn} id="backbtn">Back</button>
					{ isLoading
						? <div className="info">Chat is Loading...</div>
						: <ChatBox
							err={errs.chatBox}
							onChange={this.onChange}
							sendMsg={this.sendMsg}
							messages={messages}
							chatMsgValue={textData.chatMsg}
							user={user}
							rId={rId}
						/>
					}
					<hr />
					<ChatLegend />
				</div>
			);
		}
	}
}

Room.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Room;
