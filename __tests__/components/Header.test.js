import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../../frontend/components/Header';

describe('Component: Header', () => {
    it('should render the Header component', () => {
        const wrapper = shallow(
          <Header username={"Andros"}/>
        );

        expect(wrapper.find('h1').text()).toEqual('Ripple Chat');
        expect(wrapper.find('p').text()).toEqual('You are logged in as Andros');
    });
});
