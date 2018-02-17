import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Message from '../../frontend/components/Message';

describe('Component: Message', () => {
    it('should render the Message component', () => {
        const wrapper = shallow(
          <Message username="User 1" content="Great chatroom!" username="dros"/>
        );
        expect(wrapper.find('p').text().trim()).toEqual('Great chatroom!');
    });
});
