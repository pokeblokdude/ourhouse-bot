const mongoose = require('mongoose');

const frSchema = new mongoose.Schema({
    request: String,
    beingWorkedOn: Boolean,
    user: {
        name: String,
        tag: String,
        id: String,
        avatarURL: String
    },
    date: Date
});

const FeatureRequest = mongoose.model('FeatureRequest', frSchema);

module.exports = FeatureRequest;