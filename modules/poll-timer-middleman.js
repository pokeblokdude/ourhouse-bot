const pollHandler = require('./poll-handler');

module.exports = {
    exec(client) {
        pollHandler.updatePolls(client);
    }
}