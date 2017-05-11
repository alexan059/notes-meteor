import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data'
import momemt from 'moment';

export const NoteListItem = (props) => {
    const className = props.note.selected ? 'item item--selected' : 'item';

    return (
        <div className={className} onClick={() => props.Session.set('selectedNoteId', props.note._id)}>
            <h5 className="item__title">{props.note.title || 'Untitled note'}</h5>
            <p className="item__subtitle">{momemt(props.note.updatedAt).format('M/DD/YY')}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: React.PropTypes.object.isRequired,
    Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
    return {Session};
}, NoteListItem);