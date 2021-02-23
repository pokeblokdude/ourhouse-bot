const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'Requests',
    command: 'requests',
    description: "Sends a list of current feature requests.",
    category: "general",
    usage: '`requests`',
    execute(message, args) {
        const json = JSON.parse(fs.readFileSync('./data/feature-requests.json'));

        if(Object.keys(json).length === 0) {
            message.channel.send('There are currently no requests.');
            return;
        }

        let requests = [];
        for(const r in json) {
            requests.push(json[r]);
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