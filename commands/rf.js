const mongoose = require('mongoose');
const FeatureRequest = require('../data/model/feature-request');

const parser = require('../modules/command-parser.js');

module.exports = {
    name: 'Request Feature',
    command: 'rf',
    description: "Writes a feature request for the devs to see. PLEASE use !requests before making a request.",
    category: "general",
    usage: '`rf [feature]`',
    execute(message, args) {
        if(!args.length) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        let str = parser.parseSingle(args);
        let obj = {
            request: str,
            beingWorkedOn: false,
            user: {
                name: (message.member.nickname || message.author.username),
                tag: message.author.tag,
                id: message.author.id,
                avatarURL: message.author.displayAvatarURL()
            },
            date: Date.now()
        }

        const request = new FeatureRequest(obj);
        request.save().then(message.channel.send('Feature request received.'));

    }
}