// assertion function that comes from mocha
const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {
    it('saves a user', (done) => {
        // create user instance
        const joe = new User({name: 'Joe'});
        // save instance into our db
        joe.save()
        // assert that record was saved
            .then(() => {
                // Has joe been saved successfully?
                // mocha adds isNew flag to instances that haven't been saved yet
                assert(!joe.isNew);
                done();
            });
        
    });
}); 