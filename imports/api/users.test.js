import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {validateNewUser} from './users';

if(Meteor.isServer) {
    describe('users', () => {

        it('should allow valid email address', () => {
            const testUser =  {emails: [{address: 'valid@email.com'}]};
            const result = validateNewUser(testUser);

            expect(result).toBe(true);
        });

        it('should reject invalid email', () => {
            const testUser =  {emails: [{address: 'invalid.email'}]};

            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });

    });
}