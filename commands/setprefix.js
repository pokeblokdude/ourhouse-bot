const fs = require('fs');
const config = require('./../data/config.json');

module.exports = {
    name: 'Set Prefix*',
    command: 'setprefix',
    description: "Changes the command prefix.",
    category: "admin",
    usage: "`setprefix [prefix]`",
    execute(message, args) {
        if(args.length !== 1) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.get('784934880433143809') || message.member.roles.cache.get('735229898871799971')) {
            console.log(config);
            Object.defineProperty(config, "prefix", {
                value: args[0],
                writable: true,
                configurable: true,
                enumerable: true
            });
            console.log(config);
            fs.writeFile('./data/config.json', JSON.stringify(config, null, 4), (err) => { if(err) { return console.log(err); } else { message.channel.send(`Updated prefix to \`${config.prefix}\`.`) } });
            message.delete();
        }
        else {
            message.channel.send('Insufficient permissions.');
        }
    }
}