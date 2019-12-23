const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;

    // before each test need to populate the db  with instances that we test for
    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('finds all users with a name of Joe', (done) => {
        User.find({ name: 'Joe' })
        .then((users) => {
            // _id doesn't work the way you imagine, it's type is ObjectId so need to convert for comparison
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });
});