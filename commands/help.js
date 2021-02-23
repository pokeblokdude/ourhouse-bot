const fs = require('fs');
const { MessageEmbed } = require("discord.js");

const config = require('./../data/config.json');
const prefix = config.prefix;
const categories = config.commandCategories;

module.exports = {
    name: 'Help',
    command: 'help',
    description: "DMs you a list of all commands, or sends info for a specified command.",
    category: "general",
    usage: '`help {category}`',
    listCategories() {
        let embed = new MessageEmbed()
            .setTitle('OurHouse Bot Commands')
            .setColor('#59A833')
            .setDescription(`Prefix: \`${prefix}\` \n\nParameters:\n\`[]\` signifies a parameter.\n\`{}\` signifies an optional parameter.\nDo not include these symbols inside your actual command.\n\`"[]"\` indicates you must place the parameter inside of quotation marks.\n\n`)
            .setFooter(`Use \`${prefix}help [category]\` to see a detailed list of commands.`)
            ;
        for(const cat in categories) {
            embed.addField(cat.charAt(0).toUpperCase() + cat.slice(1), `> ${categories[cat]}`, true);
        }
        return embed;
    },
    constructList(category) {
        if(!categories.hasOwnProperty(category)) {
            return null;
        }

        let namelist = [];
        let desclist = [];
        let usagelist = [];

        var files = fs.readdirSync('./commands');
        let commandFiles = files.filter(file => file.endsWith('.js'));

        for(const file of commandFiles) {
            const command = require(`./${file}`);
            if(command.hasOwnProperty('category')) {
                if(command.category === category.toLowerCase()) {
                    namelist.push(command.hasOwnProperty('name') ? command.name : 'unnamed');
                    desclist.push(command.hasOwnProperty('description') ? command.description : 'no description');
                    usagelist.push(command.hasOwnProperty('usage') ? command.usage : 'undefined usage');
                }
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`__**${category.charAt(0).toUpperCase() + category.slice(1)}**__ Commands`)
            .setColor('#59A833')
            .setDescription('')
            .setFooter(`Use \`${prefix}help\` to see all the categories.`)
        ;
        for(let i = 0; i < namelist.length; i++) {
            if(i === 0) {
                embed.setDescription(
                    embed.description.concat(`Prefix: \`${prefix}\` \n\nParameters:\n\`[]\` signifies a parameter.\n\`{}\` signifies an optional parameter.\nDo not include these symbols inside your actual command.\n\`"[]"\` indicates you must place the parameter inside of quotation marks.\n\nCommands with \`*\` are locked.\n\n`)
                );
            }
            embed.setDescription(
                embed.description.concat(`> __**${namelist[i]}**__ \n> *${desclist[i]}* \n> Usage: ${usagelist[i]}\n\n`)
            );
        }
        return embed;
    },
    execute(message, args) {
        // If a category was not specified
        if(!args.length) {
            let embed = this.listCategories();
            message.author.send(embed).then(message.channel.send(`<@!${message.author.id}> DMed a list of command categories!`)).catch(() => message.reply("Unable to send DM."));
            message.delete();
        }
        // If a category was specified
        else if(args.length === 1) {
            let embed = this.constructList(args[0]);
            if(embed === null) {
                message.channel.send(`Invalid category. Use \`${prefix}help\` to see all the categories.`);
                return;
            }
            message.author.send(embed).then(message.channel.send(`<@!${message.author.id}> DMed a list of commands!`)).catch(() => message.reply("Unable to send DM."));
            message.delete();
        }
        // If there was more than one argument
        else {
            message.channel.send(`Usage: ${this.usage}`);
        }
    }
}