import React from 'react';
import expect from 'expect';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Message from '../../frontend/components/Message';

chai.use(chaiEnzyme());
describe('Component: Message', () => {
    it('should render the left Message component', () => {
        const wrapper = shallow(
          <Message username="User 1" content="Great chatroom!" currentUser="dros"/>
        );
        expect(wrapper.find('p').text().trim()).toEqual('Great chatroom!');
        chai.expect(wrapper.find('div.message-left')).to.be.present();
    });

    it('should render the right Message component', () => {
        const anotherWrapper = shallow(
          <Message username="dros" content="Great chatroom again!" currentUser="dros"/>
        );
        expect(anotherWrapper.find('p').text().trim()).toEqual('Great chatroom again!');
        chai.expect(anotherWrapper.find('p')).to.have.className('message-right');
    });
});
