const fs = require('fs');
const pollHandler = require('./../modules/poll-handler.js');

module.exports = {
    name: 'End Poll*',
    command: 'endpoll',
    description: "Ends the active poll in the current channel, if there is one.",
    usage: '`endpoll`',
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.get('784934880433143809') || message.member.roles.cache.get('735229898871799971')) {
            let polls = JSON.parse(fs.readFileSync('./data/polls.json'));
            if(polls.hasOwnProperty(message.channel.id)) {
                let pollname = polls[message.channel.id].title;
                pollHandler.endPoll(message.channel.id);
                message.channel.send(`Ended poll "${pollname}"`);
            }
            else {
                message.channel.send('There are no active polls in this channel.')
            }
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
    }
}