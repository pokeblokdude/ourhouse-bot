const fs = require('fs');

module.exports = {
    name: 'Check Index',
    command: 'checkindex',
    description: 'Checks whether the current server has been indexed',
    category: 'stats',
    usage: '`stats checkindex`',
    execute(message, args) {
        const indexes = JSON.parse(fs.readFileSync('./data/stats/index.json'));
        message.channel.send(`Server **${message.guild.name}** ${indexes.hasOwnProperty(message.guild) ? '*has*' : 'has not'} been indexed.`);
    }
}