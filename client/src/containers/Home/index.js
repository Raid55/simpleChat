import React, { Component } from 'react';

import './styles.css';

import Signup     from '../../components/signup';
import RoomList   from '../../components/roomList';
import RoomCreate from '../../components/roomCreate';
import RoomJoin   from '../../components/roomJoin';

import apiClient from '../../utils/apiCalls.js';

class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
			// user: {username: "pablo"},
			// isLoading: false,
			user: null, // user info, if null that means user is not logged in
			textData: {
				signupUsername: "",
				joinRoomId: "",
			},
			errs: {
				signup: false,
				roomCreate: false,
				roomJoin: false,
				roomList: false,
			}
		};

		// Main funcs
		this.fetchData = this.fetchData.bind(this);
		this.createUser = this.createUser.bind(this);
		this.joinRoom = this.joinRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
		this.onChange = this.onChange.bind(this);

		// Helper funcs - to avoid repeating myself
		this.setUser = this.setUser.bind(this);
		this.signupErr = this.signupErr.bind(this);
		this.redirectUser = this.redirectUser.bind(this);
	}

	// sets the user in the state and returns the promise
	setUser (re) {
		this.setState({
			user: re.user,
		});
		return re;
	}
	// sets the signup error to true, and console logs it
	signupErr (err) {
		console.log(err);
		this.setState({
			errs: {
				...this.state.errs,
				signup: true,
			},
		});
	}

	redirectUser (path) {
		return null;
	}

	// fetches user data id user has a token in storage
	fetchData () {
		if (apiClient.fetchToken()) {
			apiClient.fetchUserInfo()
				.then(this.setUser)
				.catch(this.signupErr);
		}
	}

	// creates new user and sets it in state
	createUser (e) {
		e.preventDefault();

		apiClient.signup(this.state.textData.signupUsername)
			.then(this.setUser)
			.catch(this.signupErr);
	}

	joinRoom (e) {
		return null;
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

	componentDidMount () {
		this.fetchData();
	}

	// componentDidUpdate (prevProps, prevState) {
	// 	const { isLoading, user } = this.state;

	// 	if (!user && !isLoading) this.fetchData();
	// }

	render () {
		const { user, errs, textData } = this.state;

		return (
			<>
				<div className="title">
					{ user ? `Welcome back ${user.username}` : "Welcome to the chat app" }
				</div>
				<hr />
				{ user
					? <div id="home-container">
						<RoomCreate
							err={errs.roomCreate}
						/>
						<hr />
						<RoomJoin
							err={errs.roomJoin}
						/>
						<hr />
						<RoomList
							err={errs.roomList}
						/>
					</div>
					: <Signup
						err={errs.signup}
						onChange={this.onChange}
						createUser={this.createUser}
						userValue={textData.signupUsername} 
					/>
				}
			</>
		);
	}
}

export default Home;
