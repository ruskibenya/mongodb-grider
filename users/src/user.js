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
    likes: Number
});

// adding virtual type on User model
// specifically using function not fat arrow on purpose, so that this refers to the instance of user and not the document
// get here creates a kind of fake getter, that actually just runs the defined function everytime you call the attribue on an instance
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

// define the user class and connect to user collection
const User = mongoose.model('user', UserSchema);

module.exports = User;