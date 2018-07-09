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
		// putting default props here
	};

	it('calls componentDidMount', () => {
		const wrapper = mount(<ChatBox />);
		expect(ChatBox.prototype.componentDidMount.calledOnce).to.equal(true);
	});
});

// WORK IN PROGRESS
