const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        // returns a promise
        joe.remove()
        // upon promise being returned then execute:
        // try to find a user with a name of 'Joe'
            .then(() => User.findOne({ name: 'Joe'}))
            // upon second promising being returned, query of findOne
            // run the assertion 
            .then((user) => {
                assert(user === null);
                done();
            });


    });

    it('class method deleteMany', (done) => {
        // Remove a bunch of records with some given criteria
        User.deleteMany({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });

    });

    it('class method findAndDelete', (done) => {
        User.findOneAndDelete({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe'}))
                .then((user) => {
                    assert(user === null);
                    done();
                });
    });

    it('class method findByIdAndDelete', (done) => {
        User.findByIdAndDelete(joe._id)
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
}); 