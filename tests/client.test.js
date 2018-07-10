/* global describe, before, after, it */

// using timeout to wait for api call to go callback with data
// bad practice but could not find alternative
// to be fixed when more reliable solution can be implemented

import React              from 'react';
import { expect, assert } from 'chai';
import { spy }            from 'sinon';
import nock               from 'nock';

import Enzyme, { mount }  from 'enzyme';
import Adapter            from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Room from '../client/src/containers/Room';
import Home from '../client/src/containers/Home';

import Signup     from '../client/src/components/signup';
import RoomList   from '../client/src/components/roomList';
import RoomCreate from '../client/src/components/roomCreate';
import RoomJoin   from '../client/src/components/roomJoin';
import ChatBox    from '../client/src/components/chatBox';

import payloads from './mockPayloads.js';

describe('testing full render', () => {
	// before(() => {
	// 	nock()
	// });

	after(done => {
		done();
	});

	describe('Home container', () => {
		let homeContainer;
		const host     = "http://localhost"
		const username = 'testUser';
		const roomLink = '/7cdfd782';

		before(() => {
			// setting mock endpoints
			nock(host)
				.post('/api/create/user')
				.reply(201, payloads.createUser);

			nock(host)
				.get('/api/user')
				.reply(201, payloads.getUserNoRooms);

			nock(host)
				.get('/api/create/room')
				.reply(201, payloads.createRoom)

			// nock('http://localhost')
			// 	.get('/api/user')
			// 	.reply(201, payloads.getUser);

			// setting up russian spies
			spy(Home.prototype, 'componentDidMount');
			spy(Home.prototype, 'fetchData');
			spy(Home.prototype, 'createUser');
			spy(Home.prototype, 'joinRoom');
			spy(Home.prototype, 'createRoom');

			// mounting home container
			homeContainer = mount(<Home />);
		});

		after(done => {
			homeContainer.unmount();
			nock.cleanAll();
			nock.isDone();
			homeContainer.unmount();
			done();
		});

		it('updates value(in state) when text is input to user register', done => {
			expect(homeContainer.state().textData.signupUsername).to.equal("");
			homeContainer.find('input').simulate('change', {target: {name: "signupUsername", value: username}});
			expect(homeContainer.state().textData.signupUsername).to.equal(username);
			done();
		});

		it('on click to create user, makes a call to API, re-renders once call is done', done => {
			homeContainer.find('button').simulate('submit');
			expect(Home.prototype.createUser.callCount).to.equal(1);
			setTimeout(() => {
				homeContainer.update();
				expect(homeContainer.state().user.username).to.equal(username);
				done();
			}, 125);
		});

		it('user sees populated homepage', done => {
			expect(homeContainer.find('div.title').text()).to.equal(`Welcome back ${username}`)
			done();
		});

		// this is not working for now because I i am calling redirect in that component
		// without router context, I tried debugging this for 1 hour now and its getting
		// me no where, il get back to it when I have time...
		// it('clicking on create rooms calls create room func', done => {
		// 	homeContainer.find('button[name="createRoom"]').simulate('click');
		// 	expect(Home.prototype.createRoom.callCount).to.equal(1);
		// 	setTimeout(() => {
		// 		expect(homeContainer).to.throw();
		// 		expect(homeContainer.state().redirect).to.equal(roomLink);
		// 		done();
		// 	}, 125);
		// });

		// this test will have the same problem
		// it('clicking on join room with text in input calls join room func', done => {

		// });
	});

	// describe('Room container', () => {
	// 	it('test if state msg array is same size as props input array', done => {

	// 	});

	// 	it('test if msg bubbles have been rendered', done => {

	// 	});

	// 	it('clicking on send will call send msg call with msg', done => {

	// 	});

	// 	it('back button will call backBtn function', done => {

	// 	});

	// 	it('room and room id rendered properly', done => {

	// 	});
	// });

});

// in charge of testing component methods and what not
// describe('testing individual components', () => {

// 	describe('roomList component', () => {
// 		it('renders \'no rooms\' when empy array sent in props', done => {

// 		});
// 		it('renders list of rooms that where in array provided', done => {

// 		});
// 	});

// 	describe('chatBox component', () => {
// 		it('parses msg with parseMsg functuon', done => {

// 		});

// 		it('counts stock in msg with parseForAllStocks function', done => {

// 		});
// 	});

// });

// takes care of how app handles bad requests
// describe('testing for errors', () => {
// 	describe('components render err msg when err prop is passed true', () => {
// 		it('signup', done => {

// 		});

// 		it('roomList', done => {

// 		});

// 		it('roomJoin', done => {

// 		});

// 		it('roomCreate', done => {

// 		});

// 		it('chatBox', done => {
// 			// will have to load stock api to do both
// 		})
// 	});

// 	describe('nothing happens when nothing is in input box', () => {
// 		it('signup', done => {

// 		});

// 		it('roomJoin', done => {

// 		});

// 		it('chatBox', done => {
			
// 		})
// 	});
// });

// WORK IN PROGRESS


// describe('testing chatbox component', () => {
// 	before(() => {
// 		spy(ChatBox.prototype, 'componentDidMount');
// 	});

// 	after(done => {
// 		done();
// 	});

// 	const defaultPropsChatbox = {
// 		err: false,
// 		onChange: console.log,
// 		sendMsg: console.log,
// 		messages: [
// 			{
// 				"_id": "5b40eac2433afe0269d585da",
// 				"text": "testUser has joined the room...",
// 				"owner": {
// 					"_id": "5b40eab3433afe0269d585d4",
// 					"username": "testUser",
// 				},
// 				"type": "joined",
// 			},
// 			{
// 				"_id": "5b40eac2433afe0269d585da",
// 				"text": "this is a test :computer: $aapl $appl",
// 				"owner": {
// 					"_id": "5b40eab3433afe0269d585d4",
// 					"username": "testUser",
// 				},
// 				"type": "text",
// 			},
// 		],
// 		chatMsgValue: "",
// 		// user: {},
// 		// rId: "12345678",
// 	};
// 	const stockMsgTest = "Hello $aapl this is not a stock $lolxd"
// 	const emojiMsgTest = "stop...:hammer: time!"

// 	it('calls componentDidMount without errors', done => {
// 		const wrapper = mount(<ChatBox {...defaultPropsChatbox} />);
// 		expect(ChatBox.prototype.componentDidMount.calledOnce).to.equal(true);
// 		done();
// 	});

// 	// it('Parsing functions work', done => {
// 	// 	const wrapper = mount(<ChatBox {...defaultPropsChatbox} />);
// 	// })

// });
