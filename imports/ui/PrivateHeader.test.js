import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

const emptyFunc = () => {};

if (Meteor.isClient) {

    describe('PrivateHeader', () => {
        it('should use title prop as h1 text', () => {
            const title = 'Test title';

            const wrapper = mount(<PrivateHeader title="Test title" handleLogout={emptyFunc}/>);
            const h1Text = wrapper.find('.header__title').text();

            expect(h1Text).toBe(title);
        });

        it('should call handleLogout on click', () => {
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title="Test title" handleLogout={spy}/>);

            wrapper.find('.button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });
    });

}