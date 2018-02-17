import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Chatbox from '../../frontend/components/Chatbox';

describe('Component: Chatbox', () => {
    it('should render the Chatbox component', () => {
        const wrapper = shallow(
          <Chatbox messages={[{content: "Hello", username: 'Dros'}]}/>
        );
        expect(wrapper.find('p').text()).toEqual('Dros: Hello');
    });
});
