import axios from 'axios';

// init axios
const client = axios.create({
  baseURL: '/api'
})


client.setToken = function(token) {
  localStorage.setItem('token', token)
	return token
}

client.fetchToken = function() {
	return localStorage.getItem('token')
}

client.setDefaultHeader = function() {
	this.defaults.headers.common.Authorization = 'Bearer ' + this.fetchToken()
}

client.signUp = function(username) {
  return this({ method: 'post', url: '/create/user', data: {username: username} })
    .then(res => {
      return res.data.success;
    })
}

client.fetchInfo = function() {
  this.setDefaultHeader();
  return this({ method: 'get', url: '/' })
}


export default client
