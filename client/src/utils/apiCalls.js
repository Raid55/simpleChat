import axios from 'axios';

// init axios
const client = axios.create({
  baseURL: '/api'
})


client.setToken = function(token) {
  localStorage.setItem('token', token)
	return token
}

client.signUp = function(userInfo) {
	return this({ method: 'post', url: '/signup', data: userInfo})
		.then(res => {
			return res.data.success
		})
}


export default client
