/* global describe, before, after, it */

import React              from 'react';
import { expect, assert }         from 'chai';
import Enzyme, { mount }  from 'enzyme';
import Adapter            from 'enzyme-adapter-react-16';
import { spy }            from 'sinon';

import ChatBox from '../client/src/components/chatBox';

Enzyme.configure({ adapter: new Adapter() });

spy(ChatBox.prototype, 'componentDidMount');

describe('test', () => {
	const defaultPropsChatbox = {
		err: false,
		onChange: console.log,
		sendMsg: console.log,
		messages: [
			{
				"_id": "5b40eac2433afe0269d585da",
				"text": "testUser has joined the room...",
				"owner": {
					"_id": "5b40eab3433afe0269d585d4",
					"username": "testUser",
				},
				"type": "joined",
			},
		],
		chatMsgValue: "",
		user: {},
		rId: "12345678",
	};

	it('calls componentDidMount', () => {
		const wrapper = mount(<ChatBox />);
		expect(ChatBox.prototype.componentDidMount.calledOnce).to.equal(true);
	});
});

// WORK IN PROGRESS
