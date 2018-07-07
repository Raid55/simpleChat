import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

class RoomList extends Component {
	render () {
		const { err, roomsJoined } = this.props;

		return (
			<div id="roomList-container">
				<div className="info"> This is a list of rooms you previously joined </div>
				<div id="roomList-holder">
					{ err
						? <div className="noItemInList err">Error while loading rooms...</div>
						: roomsJoined.length === 0
							? <div className="noItemInList"> No rooms...yet...</div>
							: roomsJoined.map(el => {
								return el.isActive ? <Link key={el._id} className="listItem" to={el.link}>{el.name}</Link> : null;
							})
					}
				</div>
			</div>
		);
	}
}

RoomList.propTypes = {
	roomsJoined: PropTypes.array.isRequired,
	err: PropTypes.bool.isRequired,
};

export default RoomList;
