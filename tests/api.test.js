/* global describe, before, after, it */

const request = require('supertest');
const { expect } = require('chai');

describe('Loading all assets and checking all basic endpoints', () => {
	let server;
	let roomLink;
	let token;
	let tmpToken;

	before(() => {
		process.env.NODE_ENV = "test";
		delete require.cache[require.resolve('../index.js')];
		server = require('../index.js');
	});

	after(done => {
		require('../index.js').stop();
		done();
	});

	/*
		Testing assets
	*/

	// checking for server status
	it('status API should return 200', done => {
		request(server)
			.get('/api/status')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
	});

	// testing for a random api route
	it('bad endpoints must redirect to 404', done => {
		request(server)
			.get('/api/foobar')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(404, done);
	});

	// testing if common react routes server react app
	it('1 - should load react app route', done => {
		request(server)
			.get('/')
			.expect('Content-Type', 'text/html; charset=UTF-8')
			.expect(200, done);
	});
	it('2 - should load react app route', done => {
		request(server)
			.get('/qw3er5ty')
			.expect('Content-Type', 'text/html; charset=UTF-8')
			.expect(200, done);
	});

	// testing for assets
	it('normalize.css present', done => {
		request(server)
			.get('/css/normalize.css')
			.expect('Content-Type', 'text/css; charset=UTF-8')
			.expect(200, done);
	});
	it('bundle.js present', done => {
		request(server)
			.get('/dist/js/bundle.js')
			.expect('Content-Type', 'application/javascript; charset=UTF-8')
			.expect(200, done);
	});
	it('bundle.map.js present', done => {
		request(server)
			.get('/dist/js/bundle.js.map')
			.expect('Content-Type', 'application/json; charset=UTF-8')
			.expect(200, done);
	});

	/*
		User creation
	*/

	// creating user named supertest
	it('should create user', done => {
		request(server)
			.post('/api/create/user')
			.send({username: 'supertest'})
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.token).to.be.a("string");
					expect(res.body.user).to.be.an('object');

					token = res.body.token;

					done();
				}
			});
	});
	// testing if different json key is sent, in this case it is set to name
	it('shoulden\'t create user if no username', done => {
		request(server)
			.post('/api/create/user')
			.send({name: 'supertest'})
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(false);

					done();
				}
			});
	});
	// testing if username is more than 18 chars
	it('shoulden\'t create user if username > 18', done => {
		request(server)
			.post('/api/create/user')
			.send({username: 'supertest1234567890'})
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(false);

					done();
				}
			});
	});

	/*
		Making calls to the server
	*/

	it('should fetch user info (with token)', done => {
		request(server)
			.get('/api/user')
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.user).to.be.an("object");
					expect(res.body.user.username).to.be.a("string");
					expect(res.body.user.roomsJoined).to.be.an("array");

					done();
				}
			});
	});
	it('should\'nt fetch user info (without token)', done => {
		request(server)
			.get('/api/user')
			.expect(401, done);
	});

	// testing room creation
	it('should create room (with token)', done => {
		request(server)
			.get('/api/create/room')
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.roomLink).to.be.a("string");

					roomLink = res.body.roomLink;

					done();
				}
			});
	});
	it('should\'nt create room (without token)', done => {
		request(server)
			.get('/api/create/room')
			.expect(401, done);
	});

	// after room creation, it should add room to user list
	it('roomsJoined should have room(with token)', done => {
		request(server)
			.get('/api/user')
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.user).to.be.an("object");
					expect(res.body.user.username).to.be.a("string");
					expect(res.body.user.roomsJoined).to.be.an("array").to.have.lengthOf(1);

					done();
				}
			});
	});

	// user should be able to get room info
	it('should get room info(with token)', done => {
		request(server)
			.get(`/api/room/${roomLink}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.room).to.be.an("object");
					expect(res.body.user).to.be.an("object");

					done();
				}
			});
	});
	it('should\'nt get room info(without token)', done => {
		request(server)
			.get(`/api/room/${roomLink}`)
			.expect(401, done);
	});
	it('should\'nt get room info with wrong room id(with token)', done => {
		request(server)
			.get(`/api/room/12345678`)
			.set('Authorization', `Bearer ${token}`)
			.expect(400, done);
	});

	// testing sending messages to API
	it('should send message with text(with token)', done => {
		request(server)
			.post(`/api/create/msg/${roomLink}`)
			.set('Authorization', `Bearer ${token}`)
			.send({text: 'test msg'})
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);

					done();
				}
			});
	});
	it('should\'nt send message, no text(with token)', done => {
		request(server)
			.post(`/api/create/msg/${roomLink}`)
			.set('Authorization', `Bearer ${token}`)
			.send({message: 'test msg'})
			.expect(400, done);
	});
	it('should\'nt send message(without token)', done => {
		request(server)
			.post(`/api/create/msg/${roomLink}`)
			.expect(401, done);
	});
	it('should\'nt send message with bad room id(with token)', done => {
		request(server)
			.post(`/api/create/msg/12345678`)
			.set('Authorization', `Bearer ${token}`)
			.send({text: 'test msg'})
			.expect(400, done);
	});

	// creating second user to test chat and room join
	it('creating second user, tmpUser', done => {
		request(server)
			.post('/api/create/user')
			.send({username: 'mochaChai'})
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.token).to.be.a("string");
					expect(res.body.user).to.be.an('object');

					tmpToken = res.body.token;

					done();
				}
			});
	});
	it('should\'nt send message with text without first joining(with tmpToken)', done => {
		request(server)
			.post(`/api/create/msg/${roomLink}`)
			.set('Authorization', `Bearer ${tmpToken}`)
			.send({text: 'hello test'})
			.expect(400, done);
	});
	it('should get room info(with tmpToken)', done => {
		request(server)
			.get(`/api/room/${roomLink}`)
			.set('Authorization', `Bearer ${tmpToken}`)
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.room).to.be.an("object");

					done();
				}
			});
	});
	it('roomsJoined should have new room from fetching room info(with tmpToken)', done => {
		request(server)
			.get('/api/user')
			.set('Authorization', `Bearer ${tmpToken}`)
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);
					expect(res.body.user).to.be.an("object");
					expect(res.body.user.username).to.be.a("string");
					expect(res.body.user.roomsJoined).to.be.an("array").to.have.lengthOf(1);

					done();
				}
			});
	});
	it('should send message with text, now that joined(with tmpToken)', done => {
		request(server)
			.post(`/api/create/msg/${roomLink}`)
			.set('Authorization', `Bearer ${tmpToken}`)
			.send({text: 'hello test'})
			.expect(201)
			.end((err, res) => {
				if (err) done(err);
				else {
					expect(res.body.success).to.be.equal(true);

					done();
				}
			});
	});
});
