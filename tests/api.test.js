/* global describe, before, after, it */

const request = require('supertest');

describe('Loading all assets and checking all basic endpoints', function () {
	let server;

	before(() => {
		server = require('../index.js');
	});

	after(done => {
		require('../index.js').stop();
		done();
	});

	// First testing for status of api
	it('status api - api/status', done => {
		request(server)
			.get('/api/status')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
	});

	// testing for a random api route
	it('api 404', done => {
		request(server)
			.get('/api/foobar')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(404, done);
	});

	// testing if common react routes server react app
	it('1 - react app route', done => {
		request(server)
			.get('/')
			.expect('Content-Type', 'text/html; charset=UTF-8')
			.expect(200, done);
	});
	it('2 - react app route', done => {
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
});
