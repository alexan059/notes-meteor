import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {

    const renderNotes = (notes) => {
        return notes.map((note) => {
            return <NoteListItem key={note._id} note={note}/>;
        });
    };

    return (
        <div>
            <NoteListHeader/>
            {renderNotes(props.notes)}
            Notes {props.notes.length}
        </div>
    );
};

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    };
}, NoteList);