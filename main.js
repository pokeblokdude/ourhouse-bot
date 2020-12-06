const Discord = require('discord.js');

const client = new Discord.Client();

let config = require('./data/config.json');
const token = config.token;

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
    const prefix = config.prefix;
    // #engine-room = 784935785068756992, bot testing server = 735222619909128356
    if((message.channel.id === '784935785068756992' || message.channel.id === '735222619909128356') && message.content.startsWith(prefix) && !message.author.bot) {
        const msg = message.content;
        const args = msg.slice(prefix.length).split(' ');
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
        if(command === 'writetojson') {
            client.commands.get('writetojson').execute(message, args);
        }
    } 
    else {
        return;
    }
});

// ^^^ PUT CODE ABOVE ^^^ //
client.login(token);