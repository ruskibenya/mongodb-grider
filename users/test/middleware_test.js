const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middlware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is.'}); 
        joe.blogPosts.push(blogPost);


        // if we need to save/update/delete multiple objects 
        // then we don't know which one will return the promise last,  to  call done()
        // so we need to use Promise.all
        Promise.all([ joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                assert(count === 0);
                done();
            })
    } )
})