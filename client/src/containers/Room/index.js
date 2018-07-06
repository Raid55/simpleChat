import React, { Component } from 'react';

import './styles.css';

import ChatLegend from './chatLegend.js';
import ChatBox    from '../../components/chatBox';

class Room extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<div id="chat-container">
					<div className="title">
						disco disco disco
					</div>
					<hr />
					<button id="backbtn">Back</button>
					<ChatBox />
					<hr />
					<ChatLegend />
				</div>
			</>
		);
	}
}

export default Room;
