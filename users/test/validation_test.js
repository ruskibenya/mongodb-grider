const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        // explicitly set to undefined to show other developers testing for empty name
        const user = new User({ name: undefined });
        // run validation synchroniously 
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert( message ===  'Name is required.')
    })

    it('requires a name is longer than 2 characters', () => {
        const user = new User({ name: 'Al'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert( message === 'Name must be longer than 2 characters.');
    })

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert( message === 'Name must be longer than 2 characters.');
                done();
            })
    })
});