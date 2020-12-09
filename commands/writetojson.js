const fs = require('fs');

module.exports = {
    name: '[LOCKED] Write to JSON',
    command: 'writetojson',
    description: "Only for testing.",
    usage: "`writetojson [key] [value]`",
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            if(args.length !== 2) {
                message.channel.send(`Usage: ${this.usage}`);
                return;
            }
            console.log(args[0], args[1]);
            let json = {};
            Object.defineProperty(json, args[0], {
                value: args[1],
                configurable: true,
                enumerable: true,
                writable: true
            });
            console.log(json);

            let string = JSON.stringify(json, null, 4);
            fs.writeFile('./data/test.json', string, (err) => { if(err) { throw err; } else { message.channel.send(`Wrote\n${string}\nto \`test.json\``) } });
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
    }
}