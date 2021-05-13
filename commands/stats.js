const fs = require('fs');

module.exports = {
    name: 'Stats [WIP]',
    command: 'stats',
    description: "Used to access server-stats commands",
    category: "stats",
    usage: '`stats [command] {args...}`',
    execute(message, args) {
        if(!args.length) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        const cmd = args.shift().toLowerCase();

        const commands = [];
        const commandFiles = fs.readdirSync('./commands/stats').filter(file => file.endsWith('.js'));
        //console.log(commandFiles);
        for(const file of commandFiles) {
            const c = require(`./stats/${file}`);
            commands.push(c);
        }
        //console.log(commands);
        const command = commands.find(e => e.command === cmd);
        command.execute(message, args);
    }
}