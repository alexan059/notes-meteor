import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {Editor} from './Editor';
import {notes} from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('Editor', () => {
        let browserHistory;
        let call;

        beforeEach(() => {
            call = expect.createSpy();
            browserHistory = {
                push: expect.createSpy()
            };
        });

        it('should render pick note message', () => {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
            expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
        });

        it('should render not found message', () => {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}/>);
            expect(wrapper.find('p').text()).toBe('Note not found.');
        });

        it('should remove note', () => {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}
                                          note={notes[0]}/>);
            wrapper.find('button').simulate('click');
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
        });

        it('should update the note body on textarea change', () => {
            const newBody = 'New body text.';
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}
                                          note={notes[0]}/>);

            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
        });

        it('should update the note title on input change', () => {
            const newTitle = 'New title text';
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}
                                          note={notes[0]}/>);

            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle
                }
            });

            expect(wrapper.state('title')).toBe(newTitle);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
        });

        it('should set state for new note', () => {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            });

            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
        });

        it('should not set state if prop not provided', () => {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

            wrapper.setProps({
                selectedNoteId: notes[0]._id
            });

            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        });

    });
}