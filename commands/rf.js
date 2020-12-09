const fs = require('fs');
const parser = require('../modules/command-parser.js');

module.exports = {
    name: 'Request Feature',
    command: 'rf',
    description: "Writes a feature request for the devs to see. PLEASE use !requests before making a request.",
    usage: '`rf [feature]`',
    execute(message, args) {
        if(!args.length) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        const json = JSON.parse(fs.readFileSync('./data/feature-requests.json'));
        let str = parser.parseSingle(args);
        let obj = {
            request: str,
            user: {
                name: (message.member.nickname || message.author.username),
                tag: message.author.tag,
                id: message.author.id,
                avatarURL: message.author.displayAvatarURL()
            }
        }
        Object.defineProperty(json, Date.now(), {
            value: obj,
            writable: true,
            configurable: true,
            enumerable: true
        });
        fs.writeFile('./data/feature-requests.json', JSON.stringify(json, null, 4), (err) => { if(err) { throw err; } else { message.channel.send('Feature request received.'); }});
    }
}