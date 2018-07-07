import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class RoomCreate extends Component {

	render() {
		const { err, createRoom } = this.props;
		const errMsg = "There was an error while trying to create a room";

		return (
			<>
				<div className="info">
					Create a chat room, once you
					have a room you can invite as many people as you want
					by giving them your room id.
				</div>
				<button onClick={createRoom}>Create a New Room</button>
				{ err ? <div className="err">{errMsg}</div> : null }
			</>
		);
	}
}

RoomCreate.propTypes = {
	createRoom: PropTypes.func.isRequired,
	err: PropTypes.bool.isRequired,
};

export default RoomCreate;
