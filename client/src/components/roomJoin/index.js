import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class RoomJoin extends Component {
	render () {
		const { err, onChange, joinRoom, joinRoomIdValue } = this.props;
		const roomIdLength = 8; // length of a room link id
		const errMsg = "There was an error while logging you in or fetching your user info";

		return (
			<>
				<div className="info">
					Paste the 8 alphanumeric id to join that room or go to "/(room id here)"
					and it will automaticly add you to the room
				</div>
				<form onChange={onChange} onSubmit={joinRoom}>
					<input name="joinRoomId" value={joinRoomIdValue} maxLength={roomIdLength} />
					<button type="submit">Join Room</button>
				</form>
				{ err ? <div className="err">{errMsg}</div> : null }
			</>
		);
	}
}

RoomJoin.propTypes = {
	onChange: PropTypes.func.isRequired,
	joinRoom: PropTypes.func.isRequired,
	joinRoomIdValue: PropTypes.string.isRequired,
	err: PropTypes.bool.isRequired,
};

export default RoomJoin;
