const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const helper = require('./help.js');

const config = require('./../data/config.json');
const help = require('./help.js');
const prefix = config.prefix;

// TODO: switch from [LOCKED] to *
module.exports = {
    name: 'Commands*',
    command: 'commands',
    description: "Sends a list of commands to the current channel. Non-Maids use !help.",
    usage: '`commands`',
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            let embed = helper.constructList();
            message.channel.send(embed);
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
        
    }
}