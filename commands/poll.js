const fs = require('fs');
const polljson = require('./../data/polls.json');

module.exports = {
    name: 'Poll',
    command: 'poll',
    description: "Stars a poll using command arguments. Currently broken.",
    usage: '`poll "[title]" ..."[option]"`',
    execute(message, args) {
        if(!args.length) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        if(JSON.parse(polljson.hasOwnProperty(message.channel.id))){
            message.channel.send('This channel already has an active poll!');
            return;
        }
        // Turn [arg1, arg2, arg3, arg4, ... , argn] (array of words) into [title, option1, option2, ... , optionn] (array of strings)
        let pollargs = args.reduce(function(acc, val) {
            let counter = acc.counter;
            if(val.startsWith("\"")) {
                if(acc.instring) {
                    acc.validsyntax = false;
                    return;
                }
                else {
                    acc.data.push(val);
                    acc.counter += 1;
                    acc.instring = true;
                }
            }
            else if(val.endsWith("\"")) {
                if(!acc.instring) {
                    acc.validsyntax = false;
                    return;
                }
                else {
                    acc.data[counter] = acc.data[counter].concat(' ' + val);
                }
            }
            else {
                acc.data[counter] = acc.data[counter].concat(' ' + val);
            }
        }, { data: [], counter: -1, instring: false, validsyntax: true });

        console.log(pollargs.data);
        // Check if the command had valid syntax
        if(!pollargs.validsyntax) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        let polldata = {
            title: pollargs.shift()
        };
        for(let i = 0; i < pollargs.length; i++) {
            Object.defineProperty(polldata, i, {
                value: {
                    title: pollargs[i],
                    percentage: undefined
                },
                writable: true,
                configurable: true,
                enumerable: true
            });
        }

        Object.defineProperty(polljson, message.channel.id, {
            value: polldata,
            writable: true,
            configurable: true,
            enumerable: true
        });
        
        fs.writeFile('./data/polls.json', JSON.stringify(polljson, null, 4), (err) => { if(err) { throw err; } else { message.channel.send(`Wrote ${polldata.data} to \`polls.json\``) } });
    }
}