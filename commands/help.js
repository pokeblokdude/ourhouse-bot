const fs = require('fs');
const { MessageEmbed } = require("discord.js");

const config = require('./../data/config.json');
const prefix = config.prefix;

module.exports = {
    name: 'Help',
    command: 'help',
    description: "DMs you a list of all commands.",
    usage: '`help`',
    execute(message, args) {
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
                    embed.description.concat(`Prefix: \`${prefix}\` \n\n`)
                );
            }
            embed.setDescription(
                embed.description.concat(`__**${namelist[i]}**__ \n*${desclist[i]}* \nUsage: ${usagelist[i]}\n\n`)
            );
        }
        message.author.send(embed).then(message.channel.send('DMed a list of commands!')).catch(() => message.reply("Unable to send DM."));
    }
}