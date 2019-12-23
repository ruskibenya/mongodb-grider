const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is.'});
        comment = new Comment({ content: 'Congrats on great post!' });
    
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;


        // if we need to save/update/delete multiple objects 
        // then we don't know which one will return the promise last,  to  call done()
        // so we need to use Promise.all
        Promise.all([ joe.save(), blogPost.save(), comment.save() ])
            .then(() => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        // Go into the User collection
        // find a user with the name of Joe
        // load up any associated blogPosts that Joe has
        // then call the function we pass to then / execute the query
        User.findOne({ name: 'Joe' })
            // resolves the blogPosts relationship in User model
            .populate('blogPosts')
            .then((user) =>  {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            })
    })

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
        .populate({
            // in that user find the blogPosts property and load up all blogPosts
            path: 'blogPosts',
            // inside of all those blogPosts, find the comments property and load all associated comments
            populate: {
                path: 'comments',
                model: 'comment',
                // like inception we can go further!
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Joe' );
            assert(user.blogPosts[0].title === 'JS is Great');
            assert(user.blogPosts[0].comments[0].content === 'Congrats on great post!' );
            assert(user.blogPosts[0].comments[0].user.name === 'Joe' )
            done();
        })
    })
});
