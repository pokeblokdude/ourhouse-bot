const mongoose = require('mongoose');
const PcSpecs = require('../model/pc-specs');

const pcp = require('pcpartpickerparser');

module.exports = {
    name: 'Set Specs',
    command: 'setspecs',
    description: "Saves your specs from a PCPartpicker list to be shown with !specs.",
    category: "general",
    usage: '`setspecs [list id]`',
    async execute(message, args) {
        if(args.length !== 1) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        const obj = {
            userID: message.author.id,
            listID: args[0],
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
            
        }
        catch (err) {
            message.channel.send('Invalid list ID');
            return;
        }

        const record = await PcSpecs.findOne({ userID: message.author.id });
        console.log(record);
        const specs = new PcSpecs(obj);
        
        if(record != null) {
            const r = await PcSpecs.replaceOne({ userID: message.author.id }, obj).then(console.log('Wrote to database'));
            console.log(r.n);
        }
        else {
            await specs.save().then(console.log('Wrote to database'));;
        }
        
        message.channel.send(`Saved specs for <@!${message.author.id}>`); 
        message.delete();
        
    }
}