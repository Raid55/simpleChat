import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './styles.css';

import ChatLegend from './chatLegend.js';
import ChatBox    from '../../components/chatBox';

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: null,
		}
		
		// helper functions
		this.backBtn = this.backBtn.bind(this);
	}

	backBtn (e) {
		e.preventDefault();

		this.setState({
			redirect: "/",
		});
	}

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return (
				<Redirect push to={redirect} />
			);
		}
		else {
			return (
				<div id="chat-container">
					<div className="title">
						disco disco disco
					</div>
					<hr />
					<button onClick={this.backBtn} id="backbtn">Back</button>
					<ChatBox
					err="tmp"
					/>
					<hr />
					<ChatLegend />
				</div>
			);
		}
	}
}

export default Room;
