const mongoose = require('mongoose');

const specsSchema = new mongoose.Schema({
    userID: String,
    listID: String,
    memory: [],
    storage: [],
    monitor: [],
    CPU: String,
    "CPU Cooler": String,
    Motherboard: String,
    "Video Card": String,
    Case: String,
    Keyboard: String,
    Mouse: String,
    Headphones: String
});

const PcSpecs = mongoose.model('PcSpecs', specsSchema);

module.exports = PcSpecs;