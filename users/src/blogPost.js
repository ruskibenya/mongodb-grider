const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    // blogPost will have many comments, so pass an array
    // inside is a configuration object, specify the type -> ObjectId
    // this tells that this is a reference
    comments: [{ 
        type: Schema.Types.ObjectId,
        // What is this thing supposed to refer to? A comment
        ref: 'comment'
    }]
})


const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;