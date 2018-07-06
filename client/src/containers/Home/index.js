import React, { Component } from 'react';

import './styles.css';

import Signup     from '../../components/signup';
import RoomList   from '../../components/roomList';
import RoomCreate from '../../components/roomCreate';
import RoomJoin   from '../../components/roomJoin';

class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
			// user: {username: "pablo"},
			user: null, // user info, if null that means user is not logged in
			isLoading: false,
		};
	}

	fetchData () {
		// check if user has token
		// if user has token
		// // make call to api/user
		// // store user info
		// // rerender then user is logged in
		// else
		// nothing
	}


	componentDidMount () {
		this.fetchData();
	}

	componentDidUpdate (prevProps, prevState) {
		const { isLoading, user } = this.state;

		if (!user && !isLoading) this.fetchData();
	}

	render () {
		const { user, rooms } = this.state;

		return (
			<>
				<div className="title">
					{ user ? `Welcome back ${user.username}` : "Welcome to the chat app" }
				</div>
				<hr />
				{ user
					? <div id="home-container">
						<RoomCreate />
						<hr />
						<RoomJoin />
						<hr />
						<RoomList />
					</div>
					: <Signup />
				}
			</>
		);
	}
}

export default Home;
