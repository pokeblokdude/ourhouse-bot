const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    channelID: String,
    messages: [String]  // array of message IDs
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;