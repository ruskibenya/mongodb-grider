const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;

    // before each test need to populate the db  with instances that we test for
    beforeEach((done) => {
        joe = new User({ name: 'Joe '});
        joe.save()
            .then(() => done());
    });

    it('finds all users with a name of Joe', (done) => {
        User.find({ name: 'Joe' })
        .then((users) => {
            console.log(users);
            done();
        });
    });
});