const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', postCount: 0 });
        joe.save()
            .then(() => done());
    });

    const assertName = (operation, done) => {
        operation
            // find all users
            .then(() =>  User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            })
    };

    // best to use if updating multiple properties at different times
    it('instance type using set n save', (done) => {
        // when we call set the db is not updated, only in local memory
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    // best when making updates and want to save in one move
    it('A model instance can update', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done);
    });

    it('A model class can update', (done) => {
        // for every record in this collection with name Joe, change name to Alex
        assertName(
            User.updateMany({ name: 'Joe'}, { name: 'Alex'}),
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}),
            done
        )
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done
        )
    });

    // xit tells mocha, don't run this test
    it('A user can have their postcount incremented by 1', (done) => {
        User.updateMany({ name: 'Joe'}, { $inc: { likes: 10 }})
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.likes === 10);
                done();
            })
    });

});