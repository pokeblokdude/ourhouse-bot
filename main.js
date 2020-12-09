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
    //pollHandler.updatePolls(client);
    setInterval(pollHandler.updatePolls, 2500, client);
});

client.on('message', message => {
    const prefix = config.prefix;
    const msg = message.content;
    if(msg.startsWith(prefix)) {
        const args = msg.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();

        if(client.commands.has(command)) {
            client.commands.get(command).execute(message, args);
        }
        else {
            message.channel.send(`Use \`${prefix}help\` to be sent a list of all commands.`);
        }
    }
});

// ^^^ PUT CODE ABOVE ^^^ //
client.login(token);

