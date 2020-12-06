const fs = require('fs');

module.exports = {
    name: 'Write to JSON',
    command: 'writetojson',
    description: "Only for testing. Writes to a JSON file using a key/value pair.",
    usage: "`writetojson [key] [value]`",
    execute(message, args) {
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
}