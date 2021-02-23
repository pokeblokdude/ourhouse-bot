const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const helper = require('./help.js');

module.exports = {
    name: 'Commands*',
    command: 'commands',
    description: "Sends a list of commands to the current channel. Non-Maids use !help.",
    category: "admin",
    usage: '`commands {category}`',
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.get('784934880433143809') || message.member.roles.cache.get('735229898871799971')) {
            if(!args.length) {
                let embed = helper.listCategories();
                message.channel.send(embed);
                message.delete();
            }
            else if(args.length === 1) {
                let embed = helper.constructList(args[0]);
                if(embed === null) {
                    message.channel.send(`Invalid category. Use \`${prefix}commands\` to see all the categories.`);
                    return;
                }
                message.channel.send(embed);
                message.delete();
            }
            else {
                message.channel.send(`Usage: ${this.usage}`);
                return;
            }
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
        
    }
}