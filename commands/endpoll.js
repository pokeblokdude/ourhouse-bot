const fs = require('fs');
const pollHandler = require('./../modules/poll-handler.js');

const Poll = require('../model/poll.js');

module.exports = {
    name: 'End Poll*',
    command: 'endpoll',
    description: "Ends the active poll in the current channel, if there is one.",
    category: "admin",
    usage: '`endpoll`',
    async execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.get('784934880433143809') || message.member.roles.cache.get('735229898871799971')) {
            let poll = await Poll.findOne({ channelID: message.channel.id }).exec();
            console.log(poll);
            if(poll !== null) {
                let pollname = poll.title;
                pollHandler.endPoll(message.channel.id);
                message.channel.send(`Ended poll "${pollname} (Ended by user)"\n${poll.messageURL}`);
                message.delete();
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