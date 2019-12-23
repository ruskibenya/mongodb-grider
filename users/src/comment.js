const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
     content: String,
    //  can call the key whatever we want, so if confusing like user can use something like author
    // author: 
    user: { type: Schema.Types.ObjectId, ref: 'user' }
})

// here the model name is defined, so any references in other models must use the same name 'comment' not 'Comment'
const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment;