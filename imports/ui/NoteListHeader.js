import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {

    const onCreateNote = () => {
        props.meteorCall('notes.insert', (err, res) => {
            if (res) {
                props.Session.set('selectedNoteId', res);
            }
        });
    };

   return (
       <div className="item-list__header">
           <button className="button" onClick={onCreateNote}>Create Note</button>
       </div>
   );
};

NoteListHeader.propTypes = {
    meteorCall: React.PropTypes.func.isRequired,
    Session: React.PropTypes.func.isRequired
};

export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    }
}, NoteListHeader);