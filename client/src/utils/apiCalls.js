/* global localStorage */
import axios from 'axios';

// init axios
const client = axios.create({
	baseURL: '/api'
});

// this function makes sure that the request went through fine
// if not it throw appropriate error to .catch
const checkStatus = function (re) {
	if (re.status !== 200 && re.status !== 201) {
		throw new Error("The request did not respond with correct status code (200 || 201)");
	}
	else if (!re.data.success) {
		if (re.data.msg) {
			throw new Error(re.data.msg);
		}
		else {
			throw new Error("there was an error but no error msg");
		}
	}
	else {
		return re;
	}
};

// sets token in local storage
client.setToken = function (token) {
	localStorage.setItem('token', token);
	return token;
};

// gets token from local storage
client.fetchToken = function () {
	return localStorage.getItem('token');
};

// sets the token in the header as 'Authorization' for request auth
client.setDefaultHeader = function () {
	this.defaults.headers.common.Authorization = 'Bearer ' + this.fetchToken();
};

// signs up the user and sets the token in storage by calling setToken()
// also returns user object
client.signup = function (username) {
	return this({ method: 'post', url: '/create/user', data: {username: username} })
		.then(checkStatus)
		.then(re => {
			this.setToken(re.data.token);
			return re.data;
		});
};

// fetches user info from token in storage
client.fetchUserInfo = function () {
	this.setDefaultHeader();
	return this({ method: 'get', url: '/user' })
		.then(checkStatus)
		.then(re => re.data);
};

export default client;
