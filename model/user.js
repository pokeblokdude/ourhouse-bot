const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: String,
    username: String,
    totalMessages: Number,
    messages: [String]  // array of message IDs
});

const User = mongoose.model('User', userSchema);

module.exports = User;