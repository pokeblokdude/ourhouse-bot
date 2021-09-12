const mongoose = require('mongoose');
const FeatureRequest = require('../model/feature-request');

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'Requests',
    command: 'requests',
    description: "Sends a list of current feature requests.",
    category: "general",
    usage: '`requests`',
    async execute(message, args) {
        const featureRequests = await FeatureRequest.find({});

        if(!featureRequests) {
            message.channel.send('There are currently no requests.');
            return;
        }

        let requests = [];
        for(const r in featureRequests) {
            requests.push(featureRequests[r]);
        }

        let embed = new MessageEmbed().setTitle('Feature Requests for Our House Bot').setColor('#59A833');
        let str = ""
        for(let i = 0; i < requests.length; i++) {
            str = str.concat(`> **${requests[i].request}**\n> Requested by: <@!${requests[i].user.id}>\n> *Currently being worked on:* \`${requests[i].beingWorkedOn}\`\n\n`);
        }
        embed.setDescription(str)

        message.channel.send(embed);
        message.delete();

    }
}