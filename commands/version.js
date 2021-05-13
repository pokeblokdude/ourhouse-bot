const fs = require('fs');

module.exports = {
    name: 'Version',
    command: 'version',
    description: "Replies with the version of OurHouse Bot. Check version.txt on GitHub to see if it's up to date.",
    category: "general",
    usage: '`version`',
    execute(message, args) {
        const version = fs.readFileSync('./version.txt', 'utf8');
        message.channel.send(`OurHouse Bot v${version}`)
    }
}