const Discord = require('discord.js');

const client = new Discord.Client();

let auth = require('./auth.json');
const token = JSON.parse(auth)[0].token;

let prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
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
    if(command === 'commands') {
        client.commands.get('commands').execute(message, args);
    }
});

// ^^^ PUT CODE ABOVE ^^^ //
client.login(token);