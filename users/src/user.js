const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String
});

// define the user class and connect to user collection
const User = mongoose.model('user', UserSchema);

module.exports = User;