import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteList} from './NoteList';

const notes = [
    {
        _id: 'noteId1',
        title: 'Note One',
        body: '',
        updatedAt: 0,
        uderId: 'userId1'
    }, {
        _id: 'noteId2',
        title: 'Note Two',
        body: 'Note Body Two.',
        updatedAt: 0,
        uderId: 'userId2'
    }
];

if (Meteor.isClient) {
    describe('NoteList', () => {

        it('should render NoteListItem for each note', () => {
            const wrapper = mount(<NoteList notes={notes}/>);

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });

        it('should render NoteListEmptyItem if zero notes', () => {
            const wrapper = mount(<NoteList notes={[]}/>);

            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });

    });
}