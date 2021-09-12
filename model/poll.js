const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    channelID: String,
    title: String,
    timestamp: Number,
    duration: Number,
    timed: Boolean,
    totalVotes: Number,
    options: Array,
    messageID: String,
    messageURL: String
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;