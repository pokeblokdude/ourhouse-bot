const fs = require('fs');

module.exports = {
    name: 'Nuke Polls',
    command: 'nukepolls',
    description: "Immediately cancels all polls in all channels.",
    usage: '`nukepolls`',
    execute(message, args) {
        fs.writeFile('./data/polls.json', JSON.stringify({ empty: true }, null, 4), (err) => { if(err) { throw err; } else { message.channel.send(`Nuked \`polls.json\``) } });
    }
}
