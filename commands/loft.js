const fs = require('fs');

module.exports = {
    name: 'Loft',
    command: 'loft',
    description: "Used to access loft-specific commands",
    category: "loft",
    usage: '`loft [command] {args...}`',
    execute(message, args) {
        if(!args.length) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        const commands = [];
        const commandFiles = fs.readdirSync('./commands/loft').filter(file => file.endsWith('.js'));
        console.log(commandFiles);
        for(const file of commandFiles) {
            const c = require(`./loft/${file}`);
            commands.push(c);
        }
        console.log(commands);
        const command = commands.find(e => e.command === args.shift().toLowerCase());
        command.execute(message, args);
    }
}