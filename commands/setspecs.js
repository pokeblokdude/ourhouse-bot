const { memory } = require('console');
const fs = require('fs');
const pcp = require('pcpartpickerparser');

module.exports = {
    name: 'Set Specs',
    command: 'setspecs',
    description: "Saves your specs from a PCPartpicker list to be shown with !specs.",
    usage: '`setspecs [list id]`',
    async execute(message, args) {
        if(args.length !== 1) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        const json = JSON.parse(fs.readFileSync('./data/specs.json'));
        const obj = {
            memory: [],
            storage: [],
            monitor: []
        };

        try {
            const parts = await pcp.getPartsList(args[0]);
            for(const part in parts) {
                if(parts[part].type === 'Memory') {
                    obj.memory.push(parts[part].name);
                }
                else if(parts[part].type === 'Storage') {
                    obj.storage.push(parts[part].name);
                }
                else if(parts[part].type === 'Monitor') {
                    obj.monitor.push(parts[part].name);
                }
                else {
                    Object.defineProperty(obj, parts[part].type, {
                        value: parts[part].name,
                        writable: true,
                        configurable: true,
                        enumerable: true
                    });
                }
            }
            if(!obj.monitor.length) delete obj.monitor;
            
        }
        catch (err) {
            message.channel.send('Invalid list ID');
            return;
        }

        Object.defineProperty(json, message.author.id, {
            value: obj,
            writable: true,
            configurable: true,
            enumerable: true
        });

        fs.writeFile('./data/specs.json', JSON.stringify(json, null, 4), (err) => { if(err) { throw err; } else { message.channel.send(`Saved specs for <@!${message.author.id}>`); message.delete(); }});
    }
}