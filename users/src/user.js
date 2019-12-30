const mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        // all you need to add for a property to be required
        required: [true, 'Name is required.']
    },
    // mongoose will infer that this must be a nested sub-document
    posts: [PostSchema],
    likes: Number,
    // association
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// adding virtual type on User model
// specifically using function not fat arrow on purpose, so that this refers to the instance of user and not the document
// get here creates a kind of fake getter, that actually just runs the defined function everytime you call the attribue on an instance
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

// define middleware
//  to delete any blogposts that belong to a user, when deleting a user
// NOT FAT ARROW!
UserSchema.pre('remove', function(next) {
    // use mongoose to avoid cyclical loads
    // don't use require to import a model
    const BlogPost = mongoose.model('blogPost');
    // this === joe



    // use the query operator $in to find all the blogPosts of this instance of User, and delete in one swoop instead of iterating
    // go through all the BlogPosts, look at their id, and if the id is in the blogPosts that belong to this user, remove
    BlogPost.remove({ _id: { $in: this.blogPosts }  })

    // because of async nature, could return from removing user before removing all blogpost
    // so need to tell the middleware to only move onto the next step after getting back from this remove
    .then(() => next());
});

// define the user class and connect to user collection
const User = mongoose.model('user', UserSchema);

module.exports = User;