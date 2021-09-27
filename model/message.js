const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageID: String,
    channelID: String,
    authorID: String,
    content: String,
    isCommand: Boolean,
    timestamp: Number
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;