const fs = require('fs');
const { MessageEmbed } = require("discord.js");

const config = require('./../data/config.json');
const prefix = config.prefix;

// TODO: switch from [LOCKED] to *
module.exports = {
    name: '[LOCKED] Commands',
    command: 'commands',
    description: "Sends a list of commands to the current channel. Only usable by Maids and Engineers (use !help to be DMed your own list).",
    usage: '`commands`',
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            let namelist = [];
            let desclist = [];
            let usagelist = [];

            var files = fs.readdirSync('./commands');
            let commandFiles = files.filter(file => file.endsWith('.js'));

            for(const file of commandFiles) {
                const command = require(`./${file}`);
                namelist.push(command.hasOwnProperty('name') ? command.name : 'unnamed');
                desclist.push(command.hasOwnProperty('description') ? command.description : 'no description');
                usagelist.push(command.hasOwnProperty('usage') ? command.usage : 'undefined usage');
            }

            const embed = new MessageEmbed()
                .setTitle('List of Our House Commands')
                .setColor('black')
                .setDescription('')
            ;
            for(let i = 0; i < namelist.length; i++) {
                if(i === 0) {
                    embed.setDescription(
                        embed.description.concat(`Prefix: \`${prefix}\` \n\nParameters:\n\`[]\` signifies a parameter.\n\`{}\` signifies an optional parameter.\nDo not include these symbols inside your actual command.\n\`"[]"\` indicates you must place the parameter inside of quotation marks.\n\n`)
                    );
                }
                embed.setDescription(
                    embed.description.concat(`> __**${namelist[i]}**__ \n> *${desclist[i]}* \n> Usage: ${usagelist[i]}\n\n`)
                );
            }
            message.channel.send(embed);
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
        
    }
}