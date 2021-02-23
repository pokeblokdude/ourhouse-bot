const fs = require('fs');

module.exports = {
    name: 'Nuke Polls*',
    command: 'nukepolls',
    description: "Cancels all polls in all channels.",
    category: "admin",
    usage: '`nukepolls`',
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.get('784934880433143809') || message.member.roles.cache.get('735229898871799971')) {
            fs.writeFile('./data/polls.json', JSON.stringify({ empty: true }, null, 4), (err) => { if(err) { throw err; } else { message.channel.send(`Nuked \`polls.json\``) } });
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
    }
}
