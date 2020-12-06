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

        fs.writeFile('./data/test.json', JSON.stringify(json, null, 4), (err) => { if(err) throw err; });

    }
}