const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
   it('can create a subdocument', (done) => {
       const joe = new User({ 
           name: 'Joe', 
           posts: [{title: 'First Post'}]
        })

        // mongoose will automatically save all the embedded posts
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'First Post');
                done();
            })
   }) 

   it('Can add subdocuments to an existing record', (done) => {
       const joe = new User({
           name: 'Joe',
           posts: []
       })

        // save joe
       joe.save()
        // fetch joe
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            // add posts to joe
            user.posts.push({ title: 'New Post' });
            // save joe
            return user.save();
        })
        // fetch updated joe
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
           assert(user.posts[0].title === 'New Post');
           done();
        })
   })

   it('Can remove an existing subdocument', (done) =>{
       const joe = new User({
        name: 'Joe',
        posts: [{ title: 'New Title' }]
       });

       joe.save()
       .then(() => User.findOne({ name: 'Joe' }))
       .then((user) => {
        // mongoose gives us remove magic
        // user.posts[0].remove();
        const post = user.posts[0];
        post.remove();
        // subdocument remove doesn't automatically save!
        return user.save();
       })
        // fetch updated user
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            assert(user.posts.length === 0);
            done();
        })
   })
})