import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {

    const onCreateNote = () => {
        props.meteorCall('notes.insert')
    };

   return (
       <div>
           <button onClick={onCreateNote}>Create Note</button>
       </div>
   );
};

NoteListHeader.propTypes = {
    meteorCall: React.PropTypes.func.isRequired
};

export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    }
}, NoteListHeader);