const Discord = require('discord.js');
const client = new Discord.Client();

let config = require('./data/config.json');
const token = config.token;

const fs = require('fs');
const pollHandler = require('./modules/poll-handler.js');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.command.toLowerCase(), command);
}

client.once('ready', () => {
    console.log('Bot Online');
});

//client.setInterval(pollHandler.updatePolls, 250);

client.on('message', message => {
    const prefix = config.prefix;
    // #engine-room = 784935785068756992, bot testing server #general = 735222619909128356
    if((message.channel.id === '784935785068756992' || message.channel.id === '735222619909128356') && message.content.startsWith(prefix) && !message.author.bot) {
        const msg = message.content;
        const args = msg.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();

        switch(command) {
            case 'ding':
                client.commands.get('ding').execute(message, args);
                break;
            case 'embed':
                client.commands.get('embed').execute(message, args);
                break;
            case 'help':
                client.commands.get('help').execute(message, args);
                break;
            case 'nukepolls':
                client.commands.get('nukepolls').execute(message, args);
                break;
            case 'ping':
                client.commands.get('ping').execute(message, args);
                break;
            case 'poll':
                client.commands.get('poll').execute(message, args);
                break;
            case 'purge':
                client.commands.get('purge').execute(message, args);
                break;
            case 'setprefix':
                client.commands.get('setprefix').execute(message, args);
                break;
            case 'test':
                client.commands.get('test').execute(message, args);
                break;
            case 'writetojson':
                client.commands.get('writetojson').execute(message, args);
                break;
            default:
                message.channel.send(`Use \`${prefix}help\` to be sent a list of all commands.`);
        }
    } 
    else {
        return;
    }
});

// ^^^ PUT CODE ABOVE ^^^ //
client.login(token);