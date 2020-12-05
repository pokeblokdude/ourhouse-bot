const Discord = require('discord.js');

const client = new Discord.Client();

let config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.command.toLowerCase(), command);
}

client.once('ready', () => {
    console.log('Bot Online');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    if(command === 'embed') {
        client.commands.get('embed').execute(message, args);
    }
    if(command === 'setprefix') {
        client.commands.get('setprefix').execute(message, args);
    }
    if(command === 'help') {
        client.commands.get('help').execute(message, args);
    }
    if(command === 'purge') {
        client.commands.get('purge').execute(message, args);
    }
});

// ^^^ PUT CODE ABOVE ^^^ //
client.login(token);