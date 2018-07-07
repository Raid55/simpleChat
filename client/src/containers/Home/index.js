import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
			redirect: null, // if not null redirects the user to the string assigned to it
			errs: {
				signup: false,
				roomCreate: false,
				roomJoin: false,
				roomList: false,
			},
		};

		// Main funcs
		this.fetchData = this.fetchData.bind(this);
		this.createUser = this.createUser.bind(this);
		this.joinRoom = this.joinRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
		
		// Helper funcs - to avoid repeating myself
		this.onChange = this.onChange.bind(this);
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
		console.log(path)
		this.setState({
			redirect: path,
		})
		return path;
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

		apiClient.createUser(this.state.textData.signupUsername)
			.then(this.setUser)
			.catch(this.signupErr);
	}

	createRoom (e) {
		e.preventDefault();

		apiClient.createRoom()
			.then(re => `/${re.roomLink}`)
			.then(this.redirectUser)
			.catch(err => {
				console.log(err);
				this.setState({
					errs: {
						...this.state.errs,
						roomCreate: true,
					},
				})
			})
	}

	joinRoom (e) {
		e.preventDefault();

		this.redirectUser(`/${this.state.textData.joinRoomId}`);
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
		const { user, errs, textData, redirect } = this.state;

		if (redirect) {
			return (
				<Redirect push to={redirect} />
			);
		}
		else {
			return (
				<>
					<div className="title">
						{ user ? `Welcome back ${user.username}` : "Welcome to the chat app" }
					</div>
					<hr />
					<div id="home-container">
						{ user
							? <>
								<RoomCreate
									err={errs.roomCreate}
									createRoom={this.createRoom}
								/>
								<hr />
								<RoomJoin
									err={errs.roomJoin}
									joinRoom={this.joinRoom}
									onChange={this.onChange}
									joinRoomIdValue={textData.joinRoomId}
								/>
								<hr />
								<RoomList
									err={errs.roomList}
									roomsJoined={user.roomsJoined}
								/>
							</>
							: <Signup
								err={errs.signup}
								onChange={this.onChange}
								createUser={this.createUser}
								userValue={textData.signupUsername}
							/>
						}
					</div>
				</>
			);
		}
	}
}

export default Home;
